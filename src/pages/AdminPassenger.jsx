import React, { useEffect, useState } from "react";
import "./AdminPassenger.css";

const AdminPassenger = () => {
    const [passengers, setPassengers] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8080/passengers/getall") // Fetch all passengers
            .then((response) => response.json())
            .then((data) => setPassengers(data))
            .catch((error) => console.error("Error fetching passengers:", error));
    }, []);

    return (
        <div className="admin-passenger-container">
            <h2>All Passengers</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Gender</th>
                        <th>Age</th>
                        <th>Mobile</th>
                    </tr>
                </thead>
                <tbody>
                    {passengers.map((passenger) => (
                        <tr key={passenger.pid}>
                            <td>{passenger.pid}</td>
                            <td>{passenger.name}</td>
                            <td>{passenger.gender}</td>
                            <td>{passenger.age}</td>
                            <td>{passenger.mob}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminPassenger;
