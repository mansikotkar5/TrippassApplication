import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminAddTrip.css";

const AdminAddTrip = () => {
  const [trip, setTrip] = useState({
    triptype: "",
    source: "",
    destination: "",
    journeydate: "",
    departtime: "12:00", 
    fare: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    
    const formattedTrip = {
      ...trip,
      journeydate: new Date(trip.journeydate).toISOString().split("T")[0], 
      departtime: trip.departtime + ":00", 
    };

    const response = await fetch("http://localhost:8080/trips/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formattedTrip),
    });

    if (response.ok) {
      alert("Trip added successfully!");
      navigate("/adminviewtrips");
    } else {
      alert("Failed to add trip!");
    }
  };

  return (
    <div className="admin-container">
      <h2>Add Trip</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="triptype" placeholder="Trip Type" onChange={handleChange} required />
        <input type="text" name="source" placeholder="Source" onChange={handleChange} required />
        <input type="text" name="destination" placeholder="Destination" onChange={handleChange} required />
        <input type="date" name="journeydate" onChange={handleChange} required />
        <input type="time" name="departtime" value={trip.departtime} onChange={handleChange} required />
        <input type="number" name="fare" placeholder="Fare" onChange={handleChange} required />
        <button type="submit">Add Trip</button>
      </form>
    </div>
  );
};

export default AdminAddTrip;
