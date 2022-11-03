import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCftPPnjMaRXOOiLtAa2BkGHNvbGbn62gs",
  authDomain: "react-shoes-web-d47c8.firebaseapp.com",
  projectId: "react-shoes-web-d47c8",
  storageBucket: "react-shoes-web-d47c8.appspot.com",
  messagingSenderId: "29026058921",
  appId: "1:29026058921:web:84af1de6cce37060fb5fb8",
  measurementId: "G-JHG0XJ4RK5",
};
export const firebaseApp = initializeApp(firebaseConfig);
// Get a reference to the storage service, which is used to create references in your storage bucket
export const storage = getStorage(firebaseApp);
// Authen google
