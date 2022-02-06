import moment from 'moment'
import 'moment/locale/es'
import Link from 'next/link'
moment.locale('es')

const DetalleProducto = ({producto}) => {

  const {id, nombre, empresa, url, descripcion, imgURL, votos, comentarios, timestamp} = producto

  return(
    <div className="flex flex-col p-3 shadow mt-4 border">
      <div className="flex">
        <img className="w-40 h-40 m-5" src={imgURL} alt=""/>
        <div className="flex flex-col justify-between">
          <div>
            <Link href="/productos/[id]" as={`/productos/${id}`}>
              <h2 className="cursor-pointer text-red-600 text-3xl">{nombre}</h2>
            </Link>
            <p className="text-xl text-red-500">{empresa}</p>
            <p className="text-gray-400 my-3">Pubicado el {moment(timestamp).format('LL')}</p>
            <p className="text-gray-400 text-xl mb-3">{descripcion.substring(0, 250)}...</p>
          </div>
          <div className="flex items-center">
            <div className="flex mr-5">
              <p className="text-red-600 font-bold text-xl">{comentarios.length}</p><i className="fas fa-comment text-red-600 text-2xl ml-2"></i>
            </div>
            <div className="flex">
              <p className="text-red-600 font-bold text-xl">{votos}</p><i className="fas fa-arrow-alt-circle-up text-red-600 text-2xl ml-2"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

}

export default DetalleProducto
