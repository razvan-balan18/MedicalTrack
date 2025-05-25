// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDHltCB_-pqdH4FYgU5OZlaTtw-27P4IW0",
    authDomain: "sistemmedical-721a1.firebaseapp.com",
    projectId: "sistemmedical-721a1",
    storageBucket: "sistemmedical-721a1.firebasestorage.app",
    messagingSenderId: "384163687233",
    appId: "1:384163687233:web:7d669bc4bd994b5d98cfc0"
  };

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
