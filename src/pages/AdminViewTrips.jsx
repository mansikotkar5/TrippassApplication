import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminViewTrips.css";

const AdminViewTrips = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/trips/getall")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  const handleDelete = async (tid) => {
    if (window.confirm("Are you sure you want to delete this trip?")) {
      try {
        const response = await fetch(`http://localhost:8080/trips/delete/${tid}`, {
          method: "DELETE",
        });
  
        const text = await response.text(); 
        console.log("Delete response:", response.status, text);
  
        if (response.ok) {
          alert("Trip deleted successfully!");
          setTrips(trips.filter((trip) => trip.tid !== tid));
        } else {
          alert("Failed to delete trip: it is already booked.");
        }
      } catch (error) {
        console.error("Delete error:", error);
        alert("Error deleting trip.");
      }
    }
  };  

  return (
    <div className="admin-view-container">
      <h2>All Trips</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>Fare</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.tid}>
              <td>{trip.tid}</td>
              <td>{trip.triptype}</td>
              <td>{trip.source}</td>
              <td>{trip.destination}</td>
              <td>{trip.journeydate}</td>
              <td>{trip.departtime ? trip.departtime.slice(0, 5) : "N/A"}</td>
              <td>{trip.fare}</td>
              <td>
                <button onClick={() => navigate(`/adminupdatetrip/${trip.tid}`, { state: trip })}>Edit</button>
                <button onClick={() => handleDelete(trip.tid)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminViewTrips;
