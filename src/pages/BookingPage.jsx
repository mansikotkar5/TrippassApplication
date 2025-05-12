import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./BookingPage.css";

const BookingPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { uid, trip } = location.state || {};

    const [noOfPassengers, setNoOfPassengers] = useState(1);
    const [payStatus] = useState("Pending");
    const [tripStatus] = useState("Upcoming");
    const totalFare = trip.fare * noOfPassengers;

    const handleProceedToPassengerDetails = () => {
        navigate("/passengerdetails", {
            state: {
                uid,
                trip,
                noOfPassengers,
                paystatus: payStatus,
                tripstatus: tripStatus,
                totalfare: totalFare,
            },
        });
    };       

    return (
        <div className="booking-form-container">
            <h2 className="text-2xl font-bold mb-4">Book Your Trip</h2>
            <form>
                <div className="mb-3">
                    <label className="block text-sm font-medium">Source:</label>
                    <input type="text" value={trip.source} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium">Destination:</label>
                    <input type="text" value={trip.destination} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium">Date:</label>
                    <input type="text" value={trip.journeydate} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium">Time:</label>
                    <input type="text" value={trip.departtime} disabled className="w-full border p-2 rounded" />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium">Number of Passengers:</label>
                    <input
                        type="number"
                        min="1"
                        value={noOfPassengers}
                        onChange={(e) => setNoOfPassengers(e.target.value)}
                        className="w-full border p-2 rounded"
                    />
                </div>

                <div className="mb-3">
                    <label className="block text-sm font-medium">Total Fare:</label>
                    <input type="text" value={totalFare} disabled className="w-full border p-2 rounded" />
                </div>

                <button type="button" onClick={handleProceedToPassengerDetails} className="w-full bg-green-500 text-white p-2 rounded">
                    Proceed to Passenger Details
                </button>
            </form>
        </div>
    );
};

export default BookingPage;
