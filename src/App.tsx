import "./App.css";

import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Container, Nav } from "react-bootstrap";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcmIaEhaHHA6wWgovO8oJtV5sJTRw24Xk",
  authDomain: "clubdecine-45619.firebaseapp.com",
  projectId: "clubdecine-45619",
  storageBucket: "clubdecine-45619.appspot.com",
  messagingSenderId: "634520489729",
  appId: "1:634520489729:web:613f0c8e88efed9c7b5500"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  return (
    <>
      <Container fluid className="pt-3">
        <Routes>
          <Route path="/" element={<Main db={db}/>}></Route>
          <Route path="/login" element={<Login db={db}/>}></Route>
        </Routes>
      </Container>
    </>
  );
}

export default App;
