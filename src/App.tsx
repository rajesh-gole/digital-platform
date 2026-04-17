import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import LandingPage from "./pages/LandingPage";

import MobileRecharge from "./pages/MobileRecharge";
import DTHRecharge from "./pages/DTHRecharge";
import ElectricityBill from "./pages/ElectricityBill";
import BusTickets from "./pages/BusTickets";
import TrainTickets from "./pages/TrainTickets";
import FlightTickets from "./pages/FlightTickets";
import Login from "./pages/Login";
import Hotels from "./pages/Hotels";
import HotelResults from "./pages/HotelResults";
import Profile from "./pages/Profile";
import MyBookings from "./pages/MyBookings";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/mobile-recharge" element={<MobileRecharge />} />
        <Route path="/dth-recharge" element={<DTHRecharge />} />
        <Route path="/electricity-bill" element={<ElectricityBill />} />
        <Route path="/bus-tickets" element={<BusTickets />} />
        <Route path="/train-tickets" element={<TrainTickets />} />
        <Route path="/flight-tickets" element={<FlightTickets />} />
        <Route path="/hotels" element={<Hotels />} />
        <Route path="/hotel-results" element={<HotelResults />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/my-bookings" element={<MyBookings />} />

      </Routes>
    </BrowserRouter>
  );
}