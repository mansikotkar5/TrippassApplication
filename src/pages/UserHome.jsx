import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./UserHome.css";

const UserHome = () => {
  const [trips, setTrips] = useState([]);
  const navigate = useNavigate();
  const userId = 1; // Replace with actual logged-in user ID from authentication

  useEffect(() => {
    fetch("http://localhost:8080/trips/getall")
      .then((response) => response.json())
      .then((data) => setTrips(data))
      .catch((error) => console.error("Error fetching trips:", error));
  }, []);

  return (
    <div className="container">
      <h2>Available Trips</h2>
      <button className="button" onClick={() => navigate("/userbookings", { state: { uid: userId } })}>
        View My Bookings
      </button>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Date</th>
            <th>Time</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Fare</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {trips.map((trip) => (
            <tr key={trip.tid}>
              <td>{trip.tid}</td>
              <td>{trip.triptype}</td>
              <td>{trip.journeydate}</td>
              <td>{trip.departtime}</td>
              <td>{trip.source}</td>
              <td>{trip.destination}</td>
              <td>{trip.fare}</td>
              <td>
                <button className="button" onClick={() => navigate(`/book/${trip.tid}`, { state: { uid: userId, trip } })}>
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UserHome;
