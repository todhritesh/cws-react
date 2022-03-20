import { initializeApp } from "firebase/app";
import {getDatabase} from 'firebase/database'
import {getStorage} from 'firebase/storage'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBdyTpxx0vykLYicnYe1m6vxiqJQiUwr0M",
  authDomain: "react-cws.firebaseapp.com",
  databaseURL: "https://react-cws-default-rtdb.firebaseio.com",
  projectId: "react-cws",
  storageBucket: "react-cws.appspot.com",
  messagingSenderId: "679097411004",
  appId: "1:679097411004:web:95b905350c8ce4e388f7b9"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const storage = getStorage(app)
export const auth = getAuth(app)