import React, {useState, useEffect} from 'react'
import {ref, uploadBytes} from 'firebase/storage'
import firebase from '../firebase'
import shortid from 'shortid'

const useValidacion = (stateInicial, validar, fun) => {

  const [valores, setValores] = useState(stateInicial)
  const [errores, setErrores] = useState({})
  const [submit, setSubmit] = useState(false)

  useEffect(() => {
    if(submit){
      const noErrores = Object.keys(errores).length === 0
      if(noErrores){
        fun()
      }
      setSubmit(false)
    }
  }, [errores])

  const handleChange = (e) => {
    setValores({
      ...valores,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const erroresValidacion = validar(valores)
    setErrores(erroresValidacion)
    setSubmit(true)
  }

  const handleBlur = () => {
    const erroresValidacion = validar(valores)
    setErrores(erroresValidacion)
  }


  return{
    valores,
    errores,
    submit,
    handleChange,
    handleSubmit,
    handleBlur
  }
}

export default useValidacion
