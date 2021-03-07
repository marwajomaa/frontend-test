import Firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyDDTkrjZILxDjLMfMSiTOr49aPr0BAnn8A",
  authDomain: "task-8d1b1.firebaseapp.com",
  projectId: "task-8d1b1",
  storageBucket: "task-8d1b1.appspot.com",
  messagingSenderId: "250847729617",
  appId: "1:250847729617:web:1ad003bdedb0c2e7e8b2f0",
  measurementId: "G-MVE3FLFRKG",
};

const firebase = Firebase.initializeApp(config);
const firestore = firebase.firestore();
const auth = Firebase.auth();

export { firebase, firestore, auth };
