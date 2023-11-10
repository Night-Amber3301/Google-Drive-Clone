// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';
import 'firebase/compat/storage'

const firebaseConfig = {
    apiKey: "AIzaSyBYAkFcgg4V3mTDgG0_oe0TWSWDe52xpx0",
    authDomain: "drive-clone-15452.firebaseapp.com",
    projectId: "drive-clone-15452",
    storageBucket: "drive-clone-15452.appspot.com",
    messagingSenderId: "885320972171",
    appId: "1:885320972171:web:5a83e8b0521902b19c218e",
    measurementId: "G-2S942EV6FY"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const storage = firebase.storage();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, storage, auth, provider}