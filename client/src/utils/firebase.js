
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"
const firebaseConfig = {
  apiKey: "AIzaSyBe4jJT5lB6I0wkNeM4QaPTtprA1V2iDTs",
  authDomain: "smartinterviewprep.firebaseapp.com",
  projectId: "smartinterviewprep",
  storageBucket: "smartinterviewprep.firebasestorage.app",
  messagingSenderId: "761627746554",
  appId: "1:761627746554:web:1ef1e298b9396fe560e943"
};


const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const provider = new GoogleAuthProvider()

export {auth , provider}