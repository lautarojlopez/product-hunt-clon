const Comentario = ({comentario}) => {

  const {usuarioNombre, msg} = comentario

  return(
    <div className="w-full mt-3 shadow border p-5">
      <p className="text-xl mb-2"><span className="text-red-600 font-bold">{usuarioNombre}</span> comentó:</p>
      <p>{msg}</p>
    </div>
  )
}

export default Comentario
