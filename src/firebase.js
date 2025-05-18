import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcoNPI3lQejXJktYvShItg1RAIbY_U_N0",
  authDomain: "ragging-98b9b.firebaseapp.com",
  projectId: "ragging-98b9b",
  storageBucket: "ragging-98b9b.firebasestorage.app",
  messagingSenderId: "309638547567",
  appId: "1:309638547567:web:287ebea2af7317f276659a",
  measurementId: "G-R6MS3CE302"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 