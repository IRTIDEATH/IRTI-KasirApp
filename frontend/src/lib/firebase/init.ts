// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBgsXbceGcsJKHINVIx3fkpWE8A5_0X3Rc",
  authDomain: "irti-kasir.firebaseapp.com",
  projectId: "irti-kasir",
  storageBucket: "irti-kasir.appspot.com",
  messagingSenderId: "820999704537",
  appId: "1:820999704537:web:515a6611fdbf882f6553c8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app