export default function validarCrearCuenta(valores) {
    
    let errores = {}

    if(!valores.nombre){
        errores.nombre = "Escribe tu nombre"
    }

    if(!valores.email){
        errores.email = "Escribe tu e-mail"
    } else if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(valores.email)){
        errores.email = "E-mail no válido"
    }

    if(!valores.password){
        errores.password = "Escribe tu contraseña"
    } else if(valores.password.length < 6){
        errores.password = "La contraseña debe tener al menos 6 caracteres"
    }

    return errores

}

