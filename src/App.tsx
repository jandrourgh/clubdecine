import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-creative";

import "./App.scss";

import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { getFirestore } from "firebase/firestore";
import { Browse } from "./pages/Browse";
import {
  Firestore,
  query as firebaseQuery,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { TClubData } from "./interfaces/clubData";
import { TStorageData } from "./interfaces/userData";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcmIaEhaHHA6wWgovO8oJtV5sJTRw24Xk",
  authDomain: "clubdecine-45619.firebaseapp.com",
  projectId: "clubdecine-45619",
  storageBucket: "clubdecine-45619.appspot.com",
  messagingSenderId: "634520489729",
  appId: "1:634520489729:web:613f0c8e88efed9c7b5500",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function App() {
  const [clubData, setClubData] = useState<TClubData | undefined>(undefined);
  const [userData, setUserData] = useState<TStorageData | undefined>(undefined);
  const navigate = useNavigate();

  useEffect(() => {
    const nombre = localStorage.getItem("nombre");
    const club = localStorage.getItem("club");
    const id = localStorage.getItem("id");

    const fetchClubData = async () => {
      const q = firebaseQuery(collection(db, "clubs"), where("id", "==", club));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setClubData(doc.data() as TClubData);
      });
    };
    if (!nombre || !club || !id) {
      navigate("/login");
    } else {
      const storageUserData: TStorageData = {
        club: club,
        nombre: nombre,
        id: id,
      };
      setUserData(storageUserData);
      fetchClubData();
    }
  }, [navigate]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Main db={db} clubData={clubData} />}></Route>
        <Route path="/login" element={<Login db={db} />}></Route>
        <Route
          path="/browse"
          element={<Browse db={db} userData={userData} />}
        ></Route>
      </Routes>
    </>
  );
}

export default App;
