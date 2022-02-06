import {Fragment, useState} from 'react'
import Layout from '../components/layout/Layout'
import useValidacion from '../hooks/useValidacion'
import validarLogin from '../validacion/validarLogin'
import Error from '../components/ui/Error'
import firebase from '../firebase'
import Router from 'next/router'

const STATE_INICIAL = {
  email: '',
  password: ''
}

export default function IniciarSesion() {

  const [error, setError] = useState('')

  const {valores,
        errores,
        submit,
        handleChange,
        handleSubmit,
        handleBlur} = useValidacion(STATE_INICIAL, validarLogin, iniciarSesion)

  const {email, password} = valores

  async function iniciarSesion(){
    try {
      await firebase.iniciarSesion(email, password)
      setError('')
      Router.push('/')
    } catch (e) {
      if(e.code === 'auth/user-not-found'){
        setError('El usuario no existe')
      }
      else if(e.code === 'auth/wrong-password'){
        setError('Contraseña incorrecta')
      }
    }
  }

  return (
    <div>
      <Layout>
        <Fragment>
          <h1 className="text-center text-red-600 text-4xl font-bold">Iniciar Sesión</h1>
          <div className="flex justify-center mt-5">
            <form onSubmit={handleSubmit} className="p-5 w-4/12">
              <div className="flex flex-col">
                {error ? <Error msg={error} /> : null}
                <label className="label mt-3">E-mail</label>
                <input value={email} onChange={handleChange} type="email" name="email" className="input"/>
                {errores.email ? <Error msg={errores.email} /> : null}
                <label className="label mt-3">Contraseña</label>
                <input value={password} onChange={handleChange} type="password" name="password" className="input"/>
                {errores.password ? <Error msg={errores.password} /> : null}
                <button className="boton w-full mt-5">INGRESAR</button>
              </div>
            </form>
          </div>
        </Fragment>
      </Layout>
    </div>
  )
}
