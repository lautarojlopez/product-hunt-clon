import {Fragment, useState} from 'react'
import Layout from '../components/layout/Layout'
import useValidacion from '../hooks/useValidacion'
import validarCrearCuenta from '../validacion/validarCrearCuenta'
import Error from '../components/ui/Error'
import firebase from '../firebase'
import Router from 'next/router'

const STATE_INICIAL = {
  nombre: '',
  email: '',
  password: ''
}

export default function CrearCuenta() {

  const [error, setError] = useState('')

  const {valores,
        errores,
        submit,
        handleChange,
        handleSubmit,
        handleBlur} = useValidacion(STATE_INICIAL, validarCrearCuenta, crearCuenta)

  const {nombre, email, password} = valores

  async function crearCuenta(){
    try {
      await firebase.registrar(nombre, email, password)
      setError('')
      Router.push('/')
    } catch (e) {
      if(e.code === 'auth/email-already-in-use'){
        setError('Ya existe una cuenta con ese e-mail')
      }

    }
  }


  return (
    <div>
      <Layout>
        <Fragment>
          <h1 className="text-center text-red-600 text-4xl font-bold">Crear Cuenta</h1>
          <div className="flex justify-center mt-5">
            <form onSubmit={handleSubmit} className="p-5 w-4/12" noValidate>
              <div className="flex flex-col">
                {error ? <Error msg={error} /> : null}
                <label className="label">Nombre</label>
                <input value={nombre} onChange={handleChange} onBlur={handleBlur} type="text" name="nombre" className="input"/>
                {errores.nombre ? <Error msg={errores.nombre} /> : null}
                <label className="label mt-3">E-mail</label>
                <input value={email} onChange={handleChange} onBlur={handleBlur} type="email" name="email" className="input"/>
                {errores.email ? <Error msg={errores.email} /> : null}
                <label className="label mt-3">Contraseña</label>
                <input value={password} onChange={handleChange} onBlur={handleBlur} type="password" name="password" className="input"/>
                {errores.password ? <Error msg={errores.password} /> : null}
                <button className="boton w-full mt-5">REGISTRARME</button>
              </div>
            </form>
          </div>
        </Fragment>
      </Layout>
    </div>
  )
}
