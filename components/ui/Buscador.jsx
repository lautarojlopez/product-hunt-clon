import {useState} from 'react';
import {useRouter} from 'next/router'

const Buscador = () => {

  const [busqueda, setBusqueda] = useState('')
  const router = useRouter()

  const buscar = (e) => {
    e.preventDefault()
    if(busqueda.trim() === ''){
      return
    }
    else{
      router.push({
        pathname: '/buscar',
        query: { q: busqueda }
      })
    }
  }

  return(
    <form onSubmit={buscar} className="relative">
      <input onChange={(e) => setBusqueda(e.target.value)} type="text" placeholder="Buscar" className="text-xl py-2 px-5 w-full border-b-2 input"/>
      <button type="submit" className="absolute right-3 top-2.5 text-red-600"><i className="text-xl fa fa-search"></i></button>
    </form>
  )

}

export default Buscador
