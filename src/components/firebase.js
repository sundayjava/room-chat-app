import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBcoNSlcFfi5tPENZ0BxYXufb7s-zbLz-U",
  authDomain: "findme-app-80ad8.firebaseapp.com",
  projectId: "findme-app-80ad8",
  storageBucket: "findme-app-80ad8.appspot.com",
  messagingSenderId: "156428499198",
  appId: "1:156428499198:web:234d3ed053a0c5dfb4cdaf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)