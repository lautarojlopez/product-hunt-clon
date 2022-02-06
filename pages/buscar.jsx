import {useEffect, useContext, useState} from 'react';
import Layout from '../components/layout/Layout'
import {useRouter} from 'next/router'
import { FirebaseContext } from '../firebase';
import { collection, getDocs, query, orderBy, where } from "firebase/firestore";
import DetalleProducto from '../components/layout/DetallesProducto';

const Buscar = () => {

  const router = useRouter()
  const busqueda = router.query.q

  const {firebase} = useContext(FirebaseContext)

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)

  async function obtenerDatos() {
    setCargando(true)
    const q = query(collection(firebase.db, "productos"), orderBy('votos', 'desc'))
    const querySnapshot = await getDocs(q)
    const datos = querySnapshot.docs.map((doc) => {
      return{
        id: doc.id,
        ...doc.data()
      }
    })
    const filtro = datos.filter((producto) => {
      return (producto.nombre.toLowerCase().includes(busqueda.toLowerCase()))
    })
    setProductos(filtro)
    setCargando(false)
  }

  useEffect(() => {
    obtenerDatos()
  }, [busqueda])

  return (
    <div>
      <Layout>
        <h1 className="text-center text-red-600 text-4xl font-bold">Resultados para {busqueda}</h1>
        <div className="mt-3 flex justify-center">
          {cargando ? <i className="fas fa-spinner animate-spin text-4xl text-red-600"></i> : null}
        </div>
        {
          productos.map((producto) => (
            <DetalleProducto
              key={producto.id}
              producto={producto}
            />
          ))
        }
      </Layout>
    </div>

  )
}

export default Buscar
