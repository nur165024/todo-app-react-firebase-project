import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBRi7nnL8IDLa90TW-U6pHeGvK5aEHV9As",
  authDomain: "react-todo-21.firebaseapp.com",
  projectId: "react-todo-21",
  storageBucket: "react-todo-21.appspot.com",
  messagingSenderId: "824784708529",
  appId: "1:824784708529:web:8ce64233c967271044d390",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore(app);

export default db;
