import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDD3WysivxwHoJA9b_dj1ySocJHjmmrUA0",
  authDomain: "lacmont-4288b.firebaseapp.com",
  projectId: "lacmont-4288b",
  storageBucket: "lacmont-4288b.appspot.com",
  messagingSenderId: "878120069889",
  appId: "1:878120069889:web:e9f9e95e4cfcd8de3dc900",
  measurementId: "G-9SGL7Q5BSP"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
