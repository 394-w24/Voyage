import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA91-_18TUxVdbhFNakL1IY1awbx4U1Djw",
  authDomain: "voyage-f348c.firebaseapp.com",
  databaseURL: "https://voyage-f348c-default-rtdb.firebaseio.com/",
  projectId: "voyage-f348c",
  storageBucket: "voyage-f348c.appspot.com",
  messagingSenderId: "264265134110",
  appId: "1:264265134110:web:81bec94c7562488da73e0f"
};

export const getFirebaseApp = () => {
  return !getApps().length ? initializeApp(firebaseConfig) : getApp();
};

export const getFirebaseDatabase = (firebase) => {
  return getDatabase(firebase);
};

export const getFirebaseStorage = (firebase) => {
  return getStorage(firebase);
};
