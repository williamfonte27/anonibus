// import firebase from 'firebase';
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCz6erbC_mYdKMd8ZYrjmH7tG3NfvKn58k",
  authDomain: "anonibus-sw27.firebaseapp.com",
  databaseURL: "https://anonibus-sw27.firebaseio.com",
  projectId: "anonibus-sw27",
  storageBucket: "anonibus-sw27.appspot.com",
  messagingSenderId: "834643930395",
  appId: "1:834643930395:web:d12b105847b874e87337be"
};

export default !firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();