import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./PaymentPage.css";

const PaymentPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { trip, noOfPassengers, paystatus, tripstatus, totalfare, passengers, uid } = location.state;

    const [paymentMethod, setPaymentMethod] = useState("credit-card");
    const [cardDetails, setCardDetails] = useState({ cardNumber: "", expiryDate: "", cvv: "" });
    const [upiId, setUpiId] = useState("");

    const handlePaymentMethodChange = (e) => setPaymentMethod(e.target.value);

    const handleCardDetailChange = (e) => {
        const { name, value } = e.target;
        setCardDetails(prev => ({ ...prev, [name]: value }));
    };

    const handleConfirmPayment = async () => {
        if ((paymentMethod === "credit-card" || paymentMethod === "debit-card") && 
            (!cardDetails.cardNumber || !cardDetails.expiryDate || !cardDetails.cvv)) {
            alert("Please enter valid card details.");
            return;
        }

        if (paymentMethod === "upi" && !upiId) {
            alert("Please enter a valid UPI ID.");
            return;
        }

        try {
            const bookingData = {
                trip: { tid: trip.tid },
                user: { uid: uid },
                passengers,
                paystatus: "Paid", // Update payment status
                tripstatus,
                noofpassenger: noOfPassengers,
                totalfare
            };

            const bookingResponse = await fetch("http://localhost:8080/bookings/add", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(bookingData),
            });

            if (bookingResponse.ok) {
                alert("Payment Successful! Booking Confirmed.");
                navigate("/userhome");
            } else {
                alert("Booking failed.");
            }
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("An error occurred during payment.");
        }
    };

    return (
        <div className="payment-container">
            <h2>Select Payment Method</h2>

            <div className="payment-options">
                <label>
                    <input type="radio" name="payment" value="credit-card" checked={paymentMethod === "credit-card"} onChange={handlePaymentMethodChange} />
                    Credit Card
                </label>

                <label>
                    <input type="radio" name="payment" value="debit-card" checked={paymentMethod === "debit-card"} onChange={handlePaymentMethodChange} />
                    Debit Card
                </label>

                <label>
                    <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={handlePaymentMethodChange} />
                     UPI ID
                </label>
            </div>

            {paymentMethod !== "upi" && (
                <div className="card-details">
                    <h3>Enter Card Details</h3>
                    <input type="text" name="cardNumber" placeholder="Card Number" value={cardDetails.cardNumber} onChange={handleCardDetailChange} />
                    <input type="text" name="expiryDate" placeholder="MM/YY" value={cardDetails.expiryDate} onChange={handleCardDetailChange} />
                    <input type="text" name="cvv" placeholder="CVV" value={cardDetails.cvv} onChange={handleCardDetailChange} />
                </div>
            )}

            {paymentMethod === "upi" && (
                <div className="upi-details">
                    <h3>Enter UPI ID</h3>
                    <input type="text" placeholder="example@upi" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
                </div>
            )}

            <button onClick={handleConfirmPayment} className="confirm-button">Confirm Payment</button>
        </div>
    );
};

export default PaymentPage;
