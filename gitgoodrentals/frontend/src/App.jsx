// src/App.jsx
import './App.css'
import AdminPage from "./components/AdminPage"
import { useState } from "react";
import Navbar from "./components/navbar";
import { Route, Routes } from "react-router-dom";
import Account from "./components/userAccount/Account";
import React from "react";
import Logout from "./components/Pages/Logout";
import UserReservationManagement from './components/userAccount/UserReservationManagement'
import { BrowseVehicles } from "./components/Pages/BrowseVehicles";
import RentCar from "./components/Pages/RentCar";
import LandingPage from './components/Pages/LandingPage';
import CheckIn from './components/Pages/CheckIn';
import ReservationIdPage from './components/CheckIn/ReservationIdPage'; // Import the new component

function App() {
  return (
    <>
        <Navbar />
  
      <Routes>
        <Route path='CheckIn' element={< CheckIn />}></Route>
        <Route path='CheckIn/:reservationId' element={<ReservationIdPage />}></Route>
        <Route path='CheckOut/:reservationId' element={<ReservationIdPage />}></Route>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="admin" element={<AdminPage/>}></Route>
        <Route path="browse" element={<BrowseVehicles/>}></Route>
        <Route path="user" element={<UserReservationManagement/>}></Route>
        <Route path="account" element={<Account />}></Route>
        <Route path="logout" element={<Logout />}></Route>
        <Route path="reserve" element={<RentCar />}></Route>
        <Route path="checkin" element={<CheckIn />}></Route>
      </Routes>
    </>
  );
}

export default App;