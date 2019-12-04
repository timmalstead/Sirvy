import firebase from 'firebase/app'
import 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyDATkvN0QesUUkd7bVNSxK_SoXgb3tbjyY",
    authDomain: "sirvy-b4467.firebaseapp.com",
    databaseURL: "https://sirvy-b4467.firebaseio.com",
    projectId: "sirvy-b4467",
    storageBucket: "sirvy-b4467.appspot.com",
    messagingSenderId: "664724418626",
    appId: "1:664724418626:web:86f8d925e7bc318fbbfddb"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

const database = firebase.database()

export default database