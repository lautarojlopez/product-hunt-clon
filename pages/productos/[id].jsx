import Layout from '../../components/layout/Layout'
import Comentario from '../../components/layout/Comentario'
import Error404 from '../../components/layout/Error404'
import {useContext, useEffect, useState} from 'react'
import {useRouter} from 'next/router'
import { doc, getDoc, updateDoc, deleteDoc } from "firebase/firestore";
import {FirebaseContext} from '../../firebase'
import Swal from 'sweetalert2'
import shortid from 'shortid'
import moment from 'moment'
import 'moment/locale/es'
moment.locale('es')

const Producto = () => {

  //State
  const [producto, setProducto] = useState({})
  const [error, setError] = useState(false)
  const [cargando, setCargando] = useState(false)
  const [comentario, setComentario] = useState({
    msg: ''
  })

  const router = useRouter()
  const id = router.query.id
  const {usuario, firebase} = useContext(FirebaseContext)

  async function obtenerProducto() {
    setCargando(true)
    const producto = await getDoc(doc(firebase.db, "productos", id))
    if(producto.exists()){
      setProducto(producto.data())
    }
    else{
      setError(true)
    }
    setCargando(false)
  }

  const votarProducto = async () => {
    if(!hasVoted.includes(usuario.uid)){
      const total = votos + 1
      hasVoted.push(usuario.uid)
      const nuevoHasVoted = hasVoted
      await updateDoc(doc(firebase.db, "productos", id), {votos: total, hasVoted: nuevoHasVoted})
      setProducto({
        ...producto,
        votos: total
      })
    }
    else{
      const total = votos - 1
      const pos = hasVoted.indexOf(usuario.id)
      hasVoted.splice(pos, 1)
      const nuevoHasVoted = hasVoted
      await updateDoc(doc(firebase.db, "productos", id), {votos: total, hasVoted: nuevoHasVoted})
      setProducto({
        ...producto,
        votos: total
      })
    }
  }

  const onChangeComentario = (e) => {
    setComentario({
      ...comentario,
      usuarioId: usuario.uid,
      usuarioNombre: usuario.displayName,
      msg: e.target.value,
      id: shortid.generate()
    })
  }

  const agregarComentario = async (e) => {
    e.preventDefault()
    if(comentario.msg !== ''){
      const nuevosComentarios = [...comentarios, comentario]
      await updateDoc(doc(firebase.db, "productos", id), {comentarios: nuevosComentarios}).then(() => {
        Swal.fire(
          'Comentario Enviado',
          '',
          'success'
        ).then(() => {
            router.reload()
        })
      })
      setProducto({
        ...producto,
        comentarios: nuevosComentarios
      })
    }
  }

  const eliminarProducto = () => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "Tu publicación se borrará para siempre",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#16a34a',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#dc2626'
    }).then(async (result) => {

      if(result.isConfirmed){
        await deleteDoc(doc(firebase.db, "productos", id)).then(() => {
          Swal.fire(
            'Eliminado',
            '',
            'success'
            )
            router.push('/')
          }
        )
      }

    })
  }

  useEffect(() => {
    if(id){
      obtenerProducto()
    }
  }, [id])

  const {nombre, empresa, url, descripcion, imgURL, votos, hasVoted, comentarios, timestamp, autor} = producto

  return(
    <Layout>
      {error ? <Error404/> :
      (<div className="mt-3">
        {cargando ? <div className="flex justify-center">
          <i className="fas fa-spinner animate-spin text-4xl text-red-600"></i>
        </div> :
        <>
        <h2 className="text-center text-red-600 text-4xl">{nombre}</h2>
        <div className="flex w-full">
          <div className="flex flex-col items-center px-10 w-full">
            <p className="text-gray-400 my-3">Pubicado el {moment(timestamp).format('LL')}</p>
            <p className="text-red-600 text-xl">Por {autor !== undefined ? autor.nombre : ''} - {empresa}</p>
            <img src={imgURL} className="w-80 h-80 my-3"/>
            <p className="mb-3 w-6/12">{descripcion}</p>
            <div className="flex justify-between w-6/12">
              <a href={url} target="_blank" rel="noreferrer" className="text-xl text-red-600 font-bold hover:text-red-500"><i className="fas fa-link"></i> Visitar Sitio Web</a>
              {!usuario ? null : (
              <button onClick={() => votarProducto()} type="button" className="text-xl text-red-600 font-bold hover:text-red-500"><i className="fas fa-thumbs-up"></i> Votar ({votos} votos)</button>
              )}
            </div>
            {
              usuario && autor && usuario.uid === autor.id ? <button onClick={eliminarProducto} type="button" className="boton">Eliminar <i className="fa fa-trash"></i></button> : null
            }
            {!usuario ? null : (
              <form onSubmit={agregarComentario} className="w-6/12">
                <p className="text-gray-500">Comentar:</p>
                <textarea defaultValue={comentario.msg} onChange={onChangeComentario} name="msg" rows="4" className="focus:outline-none p-3 shadow border border-gray-300 resize-none w-full"></textarea>
                <button type="submit" className="boton w-full my-2">Enviar Comentario</button>
              </form>
            )}
            <h2 className="mt-3 text-2xl">Comentarios</h2>
            <div className="w-6/12">
              {comentarios ? comentarios.map((comentario) => (<Comentario key={comentario.id} comentario={comentario}/>)) : null}
            </div>
          </div>
        </div>
        </>}
      </div>)}

    </Layout>
  )

}

export default Producto
