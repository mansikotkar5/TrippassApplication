import React from "react";
import { useNavigate } from "react-router-dom";
import "./AdminHome.css";

const AdminHome = () => {
  const navigate = useNavigate();

  return (
    <div className="admin-container">
      <h2>Admin Dashboard</h2>
      <button onClick={() => navigate("/adminviewtrips")}>View All Trips</button>
      <button onClick={() => navigate("/adminaddtrip")}>Add Trip</button>
      <button onClick={() => navigate("/adminbookings")}>View All Bookings</button>
      <button onClick={() => navigate("/adminpassengers")}>View All Passengers</button>
    </div>
  );
};

export default AdminHome;
