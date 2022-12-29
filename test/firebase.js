// import "firebase/compat/auth";
// import "firebase/compat/firestore";
import firebase from "firebase/compat/app";

const app = firebase.initializeApp({
  apiKey: "AIzaSyCz2pFsyx-_M0uyOOk6KIAxq0G1mOa4yuY",
  authDomain: "blabla-19-90.firebaseapp.com",
  projectId: "blabla-19-90",
  storageBucket: "blabla-19-90.appspot.com",
  messagingSenderId: "26381804243",
  appId: "1:26381804243:web:2018247cadbca9ebd76a26",
});

const db = app.firestore();

export { db };