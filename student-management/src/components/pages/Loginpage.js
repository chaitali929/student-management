import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase.js"; // Adjust the import path as needed

const Loginpage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      if (email === "admin@123.com" && password === "admin@123") {
        navigate("/studentpage"); // Navigate to studentpage.js if credentials match
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        alert("Login successful!");
      }
    } catch (err) {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleLogin}>
        <h2 style={styles.heading}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundColor: "#333",
    margin: 0,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: "#ffffff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(5, 5, 5, 0.2)",
    width: "300px",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  input: {
    marginBottom: "15px",
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ddd",
  },
  button: {
    padding: "10px",
    fontSize: "16px",
    color: "#fff",
    backgroundColor: "#333",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
  error: {
    color: "red",
    fontSize: "14px",
    marginBottom: "10px",
    textAlign: "center",
  },
};

export default Loginpage;
