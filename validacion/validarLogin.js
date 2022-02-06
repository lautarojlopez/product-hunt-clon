export default function validarLogin(valores) {

    let errores = {}

    if(!valores.email){
        errores.email = "Escribe tu e-mail"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "E-mail no válido"
    }

    if(!valores.password){
        errores.password = "Escribe tu contraseña"
    }

    return errores

}
