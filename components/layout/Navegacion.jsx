import {useContext} from 'react';
import Link from 'next/link'
import {FirebaseContext} from '../../firebase'

const Navegacion = () => {

  const {usuario} = useContext(FirebaseContext)

  return(
    <nav className="flex text-xl justify-center">
      <div className="mx-3 hover:text-red-600 transition-all duration-200 ease-linear">
        <Link href="/" className="">Inicio</Link>
      </div>
      <div className="mx-3 hover:text-red-600 transition-all duration-200 ease-linear">
        <Link href="/populares" className="">Populares</Link>
      </div>
      {usuario ?
        (<div className="mx-3 hover:text-red-600 transition-all duration-200 ease-linear">
          <Link href="/nuevo-producto" className="">Nuevo Producto</Link>
        </div>)
      : null }

    </nav>
  )

}

export default Navegacion
