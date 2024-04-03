import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAHCsu3nEO415KdGEh0VOfElNTkTRdxicE",
  authDomain: "reactuploads-bd286.firebaseapp.com",
  projectId: "reactuploads-bd286",
  storageBucket: "reactuploads-bd286.appspot.com",
  messagingSenderId: "441935442740",
  appId: "1:441935442740:web:3f634f0201c128742a2b61",
  measurementId: "G-7NNZQBHD13"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);