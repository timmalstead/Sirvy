import firebase from 'firebase/app'
import 'firebase/database'
import 'firebase/auth'

// import {dotenv} from 'dotenv'
// dotenv.config()

const dotenv = require('dotenv')
dotenv.config()

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_DATABASE_URL,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
  };

firebase.initializeApp(firebaseConfig);

const database = firebase.database()

const auth = firebase.auth()
const googleProvider = new firebase.auth.GoogleAuthProvider()
const facebookProvider = new firebase.auth.FacebookAuthProvider()

const createUserWithEmailAndPassword = (email,password) =>
  auth.createUserWithEmailAndPassword(email,password)

const signInWithEmailAndPassword = (email,password) =>
  auth.signInWithEmailAndPassword(email,password)

const signInWithGoogle = () =>
  auth.signInWithPopup(googleProvider)

const signInWithFacebook = () => 
  auth.signInWithPopup(facebookProvider)

const passwordReset = email => auth.sendPasswordResetEmail(email)

const signOut = () => auth.signOut()

export {
  auth,
  database, 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signInWithGoogle, 
  signInWithFacebook,
  passwordReset,
  signOut}