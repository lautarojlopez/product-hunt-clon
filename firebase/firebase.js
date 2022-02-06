import {initializeApp} from 'firebase/app';
import firebaseConfig from './config';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

class Firebase{
  constructor(){
    this.app = initializeApp(firebaseConfig)
    this.auth = getAuth()
    this.db = getFirestore()
    this.storage = getStorage()
  }

  //Registrar usuario
  async registrar(nombre, email, password){
    await createUserWithEmailAndPassword(this.auth, email, password)
    return await updateProfile(this.auth.currentUser, {
      displayName: nombre
    })
  }

  //Iniciar Sesión
  async iniciarSesion(email, password){
    await signInWithEmailAndPassword(this.auth, email, password)
  }

  //Cerrar Sesión
  async cerrarSesion(){
    await signOut(this.auth)
  }

}

const firebase = new Firebase()

export default firebase
