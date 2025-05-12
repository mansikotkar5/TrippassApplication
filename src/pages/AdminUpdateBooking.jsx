import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AdminUpdateBooking.css";

const AdminUpdateBooking = () => {
  const { bid } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState({
    paystatus: "",
    tripstatus: "",
  });

  useEffect(() => {
    fetch(`http://localhost:8080/bookings/getbyid/${bid}`)
      .then((res) => res.json())
      .then((data) => setBooking(data))
      .catch((error) => console.error("Error fetching booking:", error));
  }, [bid]);

  const handleChange = (e) => {
    setBooking({ ...booking, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8080/bookings/update/${bid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(booking),
    })
      .then((res) => res.json())
      .then(() => {
        alert("Booking updated successfully!"); // Show success message
        navigate("/adminbookings"); // Redirect to All Bookings page
      })
      .catch((error) => console.error("Error updating booking:", error));
  };

  return (
    <div className="update-booking">
      <h2>Update Booking</h2>
      <form onSubmit={handleSubmit}>
        <label>Payment Status:</label>
        <select name="paystatus" value={booking.paystatus} onChange={handleChange}>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
        </select>

        <label>Trip Status:</label>
        <select name="tripstatus" value={booking.tripstatus} onChange={handleChange}>
          <option value="Scheduled">Scheduled</option>
          <option value="Ongoing">Ongoing</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>

        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default AdminUpdateBooking;
