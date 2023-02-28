import React from 'react';
import logo from './logo.svg';
import './App.css';
import { getDatabase } from 'firebase/database'

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAw-1KEK_h-HRrwl52aVGI4eKfqyihDxPo",
  authDomain: "session-app-45a34.firebaseapp.com",
  projectId: "session-app-45a34",
  storageBucket: "session-app-45a34.appspot.com",
  messagingSenderId: "188663016341",
  appId: "1:188663016341:web:31bd62bf6da04e8dcd249c",
  // databaseURL: "https://session-app-45a34-default-rtdb.firebaseio.com/"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app)
export const fdb = getFirestore(app);
export const auth = getAuth(app)


function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/new" element={<h2>New page</h2>} />
    </Routes>
  );
}

export default App;
