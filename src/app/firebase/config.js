// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import "firebase/storage";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDE6AyXfRbvjyemmWkQZwV4Dmknmp7iGdo",
  authDomain: "sahil-fotoshoto.firebaseapp.com",
  projectId: "sahil-fotoshoto",
  storageBucket: "sahil-fotoshoto.appspot.com",
  messagingSenderId: "220485799414",
  appId: "1:220485799414:web:64fd997b0996bb55cd0bd7",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const projectStorage = firebase.storage();
const projectFirestore = firebase.firestore();

export { projectFirestore, projectStorage  };
