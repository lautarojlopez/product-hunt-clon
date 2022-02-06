import Layout from '../components/layout/Layout'
import {Fragment, useState, useContext} from 'react'
import Error from '../components/ui/Error'
import {FirebaseContext} from '../firebase'
import Router from 'next/router'
import { collection, addDoc } from "firebase/firestore"
import {getDownloadURL, ref, uploadBytes} from 'firebase/storage'
import shortid from 'shortid'
import Swal from 'sweetalert2'

export default function NuevoProducto(){

  //Firebase context
  const {usuario, firebase} = useContext(FirebaseContext)

  //State
  const [datos, setDatos] = useState({
    nombre: '',
    empresa: '',
    url: 'http://',
    descripcion: '',
    imagen: ''
  })
  const {nombre, empresa, url, descripcion, imagen} = datos

  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)

  const handleChange = (e) => {
    setDatos({
      ...datos,
      [e.target.name]: e.target.value
    })
  }

  async function handleSubmit(e) {
    e.preventDefault()
    if(!usuario){
      Router.push('/iniciar-sesion')
    }
    else{
      //Validación
      if(nombre.trim() === '' || empresa.trim() === '' || url.trim() === '' || imagen.trim() === ''){
        setError(true)
      }
      else{
        setError(false)
        setCargando(true)
        //SUBIR IMAGEN:
        //Archivo enviado por el usuario
        const fileImg = e.target[3].files[0]
        //Nombre random para evitar sobreescrituras en el servidor
        const nombreImgRandom = `${shortid.generate()}-${imagen.split('\\').pop()}`
        //Upload
        const imgRef = ref(firebase.storage, `imagenes/${nombreImgRandom}`)
        await uploadBytes(imgRef, fileImg)
        //Obtener URL
        getDownloadURL(imgRef).then(async (imgURL) => {
          //GUARDAR PRODUCTO:
          //Crear el objeto
          const producto = {
            nombre,
            empresa,
            url,
            descripcion,
            imgURL,
            votos: 0,
            comentarios: [],
            timestamp: Date.now(),
            autor:{
              id: usuario.uid,
              nombre: usuario.displayName
            },
            hasVoted: []
          }
          //Guardarlo en la base de datos
          await addDoc(collection(firebase.db, "productos"), producto).then(() => {
            //Ocultar spinner, mostrar alerta y redireccionar
            setCargando(false)
            Swal.fire(
              'Producto Creado',
              '',
              'success'
            ).then(() => {
                Router.push('/')
            })
          })
        })
      }
    }
  }

  return (
    <div>
      <Layout>
        <Fragment>
          <h1 className="text-center text-red-600 text-4xl font-bold">Nuevo Producto</h1>
          <div className="flex justify-center mt-5">
            <form onSubmit={handleSubmit} className="p-5 w-4/12" encType="multipart/form-data">
              <div className="flex flex-col">
                {/* CAMPO */}
                <label className="label mt-3">Nombre</label>
                <input value={nombre} onChange={handleChange} type="text" name="nombre" className="input"/>
                {error && nombre.trim() === '' ? <Error msg="Escribe un nombre"/> : null}
                {/* FIN CAMPO */}

                {/* CAMPO */}
                <label className="label mt-3">Empresa</label>
                <input value={empresa} onChange={handleChange} type="text" name="empresa" className="input"/>
                {error && empresa.trim() === '' ? <Error msg="Escribe el nombre de tu empresa"/> : null}
                {/* FIN CAMPO */}

                {/* CAMPO */}
                <label className="label mt-3">URL</label>
                <input value={url} onChange={handleChange} type="text" name="url" className="input"/>
                {error && url.trim() === '' ? <Error msg="Escribe una URL"/> : null}
                {/* FIN CAMPO */}

                {/* CAMPO */}
                <label className="label mt-3">Imagen</label>
                <input value={imagen} onChange={handleChange} type="file" name="imagen" className="py-3"/>
                {error && imagen.trim() === '' ? <Error msg="Añade una imagen"/> : null}
                {/* FIN CAMPO */}

                {/* CAMPO */}
                <label className="label mt-3">Descripción</label>
                <textarea value={descripcion} onChange={handleChange} name="descripcion" rows="8" cols="80" className="input resize-none"></textarea>
                {error && descripcion.trim() === '' ? <Error msg="Escribe una descripción"/> : null}
                {/* FIN CAMPO */}
                <div className="mt-3 flex justify-center">
                  {cargando ? <i className="fas fa-spinner animate-spin text-4xl text-red-600"></i> : null}
                </div>
                <button className="boton w-full mt-5">CREAR PRODUCTO</button>
              </div>
            </form>
          </div>
        </Fragment>
      </Layout>
    </div>
  )
}
