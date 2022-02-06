import {useRouter} from 'next/router'
const Error404 = () => {

  const router = useRouter()

  return(
    <div className="flex flex-col justify-center items-center">
      <h1 className="text-red-600 text-6xl">Error 404</h1>
      <p className="text-red-600 text-xl">Esta página no existe</p>
      <button onClick={() => router.back()} type="button" className="boton2 mt-5">Volver</button>
    </div>
  )

}

export default Error404
