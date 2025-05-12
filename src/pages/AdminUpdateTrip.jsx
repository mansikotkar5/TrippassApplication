import React, { useState, useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./AdminUpdateTrip.css";

const AdminUpdateTrip = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { tid } = useParams();
  const [trip, setTrip] = useState(location.state || null);

  useEffect(() => {
    if (!location.state) {
      fetch(`http://localhost:8080/trips/getbyid/${tid}`)
        .then((response) => response.json())
        .then((data) => setTrip(data))
        .catch(() => {
          alert("Error loading trip data!");
          navigate("/adminviewtrips");
        });
    }
  }, [location, tid, navigate]);

  const handleChange = (e) => {
    setTrip({ ...trip, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedTrip = {
      ...trip,
      journeydate: new Date(trip.journeydate).toISOString().split("T")[0], // Format date
      departtime: trip.departtime + ":00", 
    };

    const response = await fetch(`http://localhost:8080/trips/update/${tid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(trip),
    });

    if (response.ok) {
      alert("Trip updated successfully!");
      navigate("/adminviewtrips");
    } else {
      alert("Failed to update trip.");
    }
  };

  if (!trip) return <h2>Loading...</h2>;

  return (
    <div className="update-trip-container">
      <h2>Update Trip</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="triptype" value={trip.triptype} onChange={handleChange} required />
        <input type="text" name="source" value={trip.source} onChange={handleChange} required />
        <input type="text" name="destination" value={trip.destination} onChange={handleChange} required />
        <input type="date" name="journeydate" value={trip.journeydate} onChange={handleChange} required />
        <input type="time" name="departtime" value={trip.departtime} onChange={handleChange} required />
        <input type="number" name="fare" value={trip.fare} onChange={handleChange} required />
        <button type="submit">Update Trip</button>
      </form>
    </div>
  );
};

export default AdminUpdateTrip;