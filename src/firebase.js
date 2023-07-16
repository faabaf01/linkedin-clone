// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const storage = getStorage(app);

const provider = new GoogleAuthProvider();
// // Sign in using a popup.
// // const provider = new GoogleAuthProvider();
// provider.addScope("profile");
// provider.addScope("email");
// const result = await signInWithPopup(auth, provider);

// // The signed-in user info.
// const user = result.user;
// // This gives you a Google Access Token.
// const credential = GoogleAuthProvider.credentialFromResult(result);
// const token = credential.accessToken;

// Get a reference to the storage service, which is used to create references in your storage bucket

export { auth, provider, storage };
export default db;

