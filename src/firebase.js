import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions"; // TODO: Add SDKs for Firebase products that you want to use

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyBAI4JQZWTun9Ot4Ce2uq2VMsy6TPcQfqQ",
  authDomain: "standard-kraken-board.firebaseapp.com",
  projectId: "standard-kraken-board",
  storageBucket: "standard-kraken-board.appspot.com",
  messagingSenderId: "658330996285",
  appId: "1:658330996285:web:e2d2f15ffc9c3fc365e454",
  measurementId: "G-KFVHCS69WQ",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const fbFunctions = getFunctions(app);

// const app = initializeApp(firebaseConfig);
// const auth = getAuth(app);
// connectAuthEmulator(auth, "http://localhost:9099");
// const db = getFirestore(app);
// connectFirestoreEmulator(db, "localhost", 8080);
// const fbFunctions = getFunctions(app);
// connectFunctionsEmulator(fbFunctions, "localhost", 5001);

export { app, auth, db, fbFunctions };
