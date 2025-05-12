import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./UserBookings.css"; // Add CSS for styling

const UserBookings = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { uid } = location.state || {}; // Extract uid from navigation state

    const [bookings, setBookings] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!uid) {
            setError("User ID is missing!");
            return;
        }

        fetch(`http://localhost:8080/bookings/users/${uid}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => setBookings(data))
            .catch((error) => setError(error.message));
    }, [uid]);

    if (error) return <div className="error">Error: {error}</div>;

    return (
        <div className="user-bookings-container">
            <h2>My Bookings</h2>
            {bookings.length === 0 ? (
                <p>No bookings found.</p>
            ) : (
                <table className="user-bookings-table">
                    <thead>
                        <tr>
                            <th>Booking ID</th>
                            <th>Trip</th>
                            <th>Passengers</th>
                            <th>Fare</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr key={booking.bid}>
                                <td>{booking.bid}</td>
                                <td>{booking.trip.source} → {booking.trip.destination}</td>
                                <td>
                                    <ul>
                                        {booking.passengers.map((p, index) => (
                                            <li key={index}>{p.name} ({p.age} yrs, {p.gender})</li>
                                        ))}
                                    </ul>
                                </td>
                                <td>₹{booking.totalfare}</td>
                                <td>{booking.tripstatus}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <button className="back-button" onClick={() => navigate("/userhome", { state: { uid } })}>
                Back to Home
            </button>
        </div>
    );
};

export default UserBookings;
