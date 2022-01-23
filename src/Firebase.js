// import firebase from 'firebase/compat/app';
import {GoogleAuthProvider} from 'firebase/auth';
// import { initializeApp } from 'firebase/compat/app';
import { initializeApp } from 'firebase/app';
// import 'firebase/firestore';

// const firebase = require("firebase");

const firebaseConfig = {
  apiKey: "AIzaSyC7eoVwy5ch6iYHAKS2c1BALIQLpCAtEQI",
  authDomain: "survey-tool-aedad.firebaseapp.com",
  projectId: "survey-tool-aedad",
  storageBucket: "survey-tool-aedad.appspot.com",
  messagingSenderId: "530640394128",
  appId: "1:530640394128:web:7e0bec5ea3608c69940515"
};

const firebaseApp = initializeApp(firebaseConfig);
// initializeApp(firebaseConfig);
// const db = firestore();
// const auth = firebase.auth();
const provider = new GoogleAuthProvider();

export {provider};
// export default db;