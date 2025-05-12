import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SignIn.css";

function SignIn() {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/${role}/signin?username=${credentials.username}&password=${credentials.password}`,
        { method: "POST" }
      );

      if (!response.ok) {
        throw new Error("Network error");
      }

      const data = await response.text();

      if (data === "SignedIn") {
        setMessage("Login Successful ✅");

        if (role === "admin") {
          navigate("/adminhome"); // Redirect admin
        } else {
          navigate("/userhome");  // Redirect normal user
        }
      } else {
        setMessage("❌ Invalid Credentials");
      }
    } catch (error) {
      setMessage("⚠️ Error connecting to the server");
    }
  };

  return (
    <div className="auth-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <label>Select Role:</label>
        <select onChange={handleRoleChange} value={role}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <input type="text" name="username" placeholder="Username" onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <p>{message}</p>
    </div>
  );
}

export default SignIn;
