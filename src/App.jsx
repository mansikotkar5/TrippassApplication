import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import WelcomePage from "./components/WelcomePage";
import AboutPage from "./pages/AboutPage";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AdminHome from "./pages/AdminHome";
import AdminViewTrips from "./pages/AdminViewTrips";
import AdminAddTrip from "./pages/AdminAddTrip";
import AdminUpdateTrip from "./pages/AdminUpdateTrip";
import UserHome from "./pages/UserHome";
import BookingPage from "./pages/BookingPage";
import AdminBookings from "./pages/AdminBookings";
import UpdateBooking from "./pages/AdminUpdateBooking";
import PassengerDetails from "./pages/PassengerDetails";
import AdminPassenger from "./pages/AdminPassenger";
import PaymentPage from "./pages/PaymentPage";
import UserBookings from "./pages/UserBookings";
import "./styles.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/adminviewtrips" element={<AdminViewTrips />} />
        <Route path="/adminaddtrip" element={<AdminAddTrip />} />
        <Route path="/adminupdatetrip/:tid" element={<AdminUpdateTrip />} />
        <Route path="/userhome" element={<UserHome />} />
        <Route path="/book/:tid" element={<BookingPage />} />
        <Route path="/adminbookings" element={<AdminBookings />} />
        <Route path="/adminupdatebooking/:bid" element={<UpdateBooking />} />
        <Route path="/passengerdetails" element={<PassengerDetails />} />
        <Route path="/adminpassengers" element={<AdminPassenger />} />
        <Route path="/paymentpage" element={<PaymentPage />} />
        <Route path="/userbookings" element={<UserBookings />} />
      </Routes>
    </Router>
  );
};

export default App;
