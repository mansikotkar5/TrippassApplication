import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminBookings.css";

const AdminBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8080/bookings/getall")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched Bookings:", data);
        setBookings(data);
        setLoading(false); // Stop loading
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        setLoading(false);
      });
  }, []);

  const handleUpdate = (bid) => {
    navigate(`/adminupdatebooking/${bid}`);
  };

  if (loading) {
    return <div>Loading bookings...</div>;
  }

  return (
    <div className="admin-bookings">
      <h2>All Bookings</h2>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Passenger Name</th>
            <th>Source</th>
            <th>Destination</th>
            <th>Date</th>
            <th>Time</th>
            <th>No. of Passengers</th>
            <th>Total Fare</th>
            <th>Payment Status</th>
            <th>Trip Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
  {bookings.length > 0 ? (
    bookings.map((booking) => (
      <tr key={booking.bid}>
        <td>{booking.bid || "N/A"}</td>
        <td>{booking.passengers && booking.passengers.length > 0 ? booking.passengers[0].name : "N/A"}</td>
        <td>{booking.trip?.source || "N/A"}</td>
        <td>{booking.trip?.destination || "N/A"}</td>
        <td>{booking.trip?.journeydate || "N/A"}</td>
        <td>{booking.trip?.departtime || "N/A"}</td>
        <td>{booking.noofpassenger || "N/A"}</td>
        <td>{booking.totalfare || "N/A"}</td>
        <td>{booking.paystatus || "N/A"}</td>
        <td>{booking.tripstatus || "N/A"}</td>
        <td>
          <button onClick={() => handleUpdate(booking.bid)}>Update</button>
        </td>
      </tr>
    ))
  ) : (
    <tr>
      <td colSpan="11">No bookings available.</td>
    </tr>
  )}
</tbody>
      </table>
    </div>
  );
};

export default AdminBookings;
