// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCvaDmLcgycoZl7MSvEeXJ3Af-xZ8sPWdQ",
  authDomain: "candev-equity-talent.firebaseapp.com",
  projectId: "candev-equity-talent",
  storageBucket: "candev-equity-talent.appspot.com",
  messagingSenderId: "797351458913",
  appId: "1:797351458913:web:e13b48d72a23fc8a3d1220"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app