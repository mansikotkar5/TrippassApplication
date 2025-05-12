import React, { useState } from "react";
import "./SignUp.css"; // Import styles

function SignUp() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:8080/${role}/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });
    const data = await response.json();
    setMessage(data ? "Sign Up Successful" : "Sign Up Failed");
  };

  return (
    <div className="auth-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Role:</label>
        <select onChange={handleRoleChange} value={role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignUp;
