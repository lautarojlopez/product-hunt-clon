import {useEffect, useContext, useState} from 'react';
import Layout from '../components/layout/Layout'
import { FirebaseContext } from '../firebase';
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import DetalleProducto from '../components/layout/DetallesProducto';

export default function Home() {

  const {firebase} = useContext(FirebaseContext)

  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(false)

  async function obtenerDatos() {
    setCargando(true)
    const q = query(collection(firebase.db, "productos"), orderBy('timestamp', 'desc'))
    const querySnapshot = await getDocs(q)
    const datos = querySnapshot.docs.map((doc) => {
      return{
        id: doc.id,
        ...doc.data()
      }
    })
    setProductos(datos)
    setCargando(false)
  }

  useEffect(() => {
    obtenerDatos()
  }, [])

  return (
    <div>
      <Layout>
        <h1 className="text-center text-red-600 text-4xl font-bold">Inicio</h1>
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
