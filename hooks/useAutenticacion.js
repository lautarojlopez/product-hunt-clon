import React, { useEffect, useState } from 'react';
import firebase from '../firebase'
import { onAuthStateChanged } from 'firebase/auth'

function useAutenticacion() {

  const [usuarioAutenticado, setUsuarioAutenticado] = useState(null)

  useEffect(() => {
    const unsuscribe = onAuthStateChanged(firebase.auth, (usuario) => {
      if (usuario) {
        setUsuarioAutenticado(usuario)
      }
      else {
        setUsuarioAutenticado(null)
      }
    })

    return () => unsuscribe

  }, [])

  return usuarioAutenticado

}

export default useAutenticacion
