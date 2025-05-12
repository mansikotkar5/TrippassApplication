import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PassengerDetails.css"; // Import CSS

const PassengerDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { trip, noOfPassengers, paystatus, tripstatus, totalfare, uid } = location.state;

    const [passengers, setPassengers] = useState(
        Array.from({ length: noOfPassengers }, () => ({ name: "", gender: "", age: "", mob: "" }))
    );

    const handleChange = (index, field, value) => {
        const updatedPassengers = [...passengers];
        updatedPassengers[index][field] = value;
        setPassengers(updatedPassengers);
    };

    const handleProceedToPayment = () => {
        for (let i = 0; i < passengers.length; i++) {
            const { name, gender, age, mob } = passengers[i];
    
            // Name validation
            if (!/^[A-Za-z\s]{2,50}$/.test(name)) {
                alert(`Passenger ${i + 1}: Name must be 2-50 letters only.`);
                return;
            }
    
            // Gender validation
            if (!gender) {
                alert(`Passenger ${i + 1}: Please select a gender.`);
                return;
            }
    
            // Age validation
            const ageNumber = parseInt(age);
            if (isNaN(ageNumber) || ageNumber < 1 || ageNumber > 120) {
                alert(`Passenger ${i + 1}: Please enter a valid age (1-120).`);
                return;
            }
    
            // Mobile number validation
            if (!/^[0-9]{10}$/.test(mob)) {
                alert(`Passenger ${i + 1}: Mobile number must be 10 digits.`);
                return;
            }
        }
    
        // If all validations pass
        navigate("/paymentpage", {
            state: {
                trip,
                noOfPassengers,
                paystatus,
                tripstatus,
                totalfare,
                passengers,
                uid,
            },
        });
    };       

    return (
        <div className="passenger-container">
            <h2>Enter Passenger Details</h2>
            {passengers.map((passenger, index) => (
                <div key={index} className="passenger-form">
                    <h3>Passenger {index + 1}</h3>
                    <input type="text" placeholder="Name" value={passenger.name} onChange={(e) => handleChange(index, "name", e.target.value)} />
                    <select value={passenger.gender} onChange={(e) => handleChange(index, "gender", e.target.value)}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <input type="number" placeholder="Age" value={passenger.age} onChange={(e) => handleChange(index, "age", e.target.value)} />
                    <input type="text" placeholder="Mobile Number" value={passenger.mob} onChange={(e) => handleChange(index, "mob", e.target.value)} />
                </div>
            ))}
            <button onClick={handleProceedToPayment} >
                Proceed to Payment
            </button>
        </div>
    );
};

export default PassengerDetails;
