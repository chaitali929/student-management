import React, { useState } from 'react';
import { db } from '../../firebase'; // Assuming firebase config is in firebase.js
import { collection, addDoc } from 'firebase/firestore';

const AddStudent = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: '',
    studentId: '',
    class: '',
    section: '',
    rollNumber: '',
    parentContact: '',
  });

  const [studentAdded, setStudentAdded] = useState(false); // State to track if the student was added

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Adding student data to Firestore
      await addDoc(collection(db, 'students'), formData); // 'students' is the collection name in Firestore
      setStudentAdded(true); // Show success message
      setTimeout(() => setStudentAdded(false), 3000); // Reset the message after 3 seconds
      // Optionally, clear the form data after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: '',
        dateOfBirth: '',
        gender: '',
        studentId: '',
        class: '',
        section: '',
        rollNumber: '',
        parentContact: '',
      });
    } catch (error) {
      console.error('Error adding document: ', error);
      alert('There was an error adding the student data.');
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Add a New Student</h1>
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.leftColumn}>
          <div style={styles.formGroup}>
            <label style={styles.label}>First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Address</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Date of Birth</label>
            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Class</label>
            <input
              type="text"
              name="class"
              value={formData.class}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Roll Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <button type="submit" style={styles.submitButton}>Add Student</button>
        </div>

        <div style={styles.rightColumn}>
          <div style={styles.formGroup}>
            <label style={styles.label}>Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Phone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Gender</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Student ID</label>
            <input
              type="text"
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Section</label>
            <input
              type="text"
              name="section"
              value={formData.section}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
          <div style={styles.formGroup}>
            <label style={styles.label}>Parent Contact</label>
            <input
              type="tel"
              name="parentContact"
              value={formData.parentContact}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>
        </div>
      </form>

      {studentAdded && (
        <p style={styles.successMessage}>Student added successfully!</p>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '30px',
    maxWidth: '1200px',
    margin: '0 auto',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    marginTop: '30px',
  },
  heading: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '50px',
  },
  leftColumn: {
    flex: 1,
    minWidth: '300px',
  },
  rightColumn: {
    flex: 1,
    minWidth: '300px',
  },
  formGroup: {
    marginBottom: '15px',
  },
  label: {
    fontSize: '14px',
    marginBottom: '5px',
    color: '#333',
  },
  input: {
    padding: '10px',
    fontSize: '14px',
    borderRadius: '4px',
    border: '2px solid #ddd',
    backgroundColor: '#f9f9f9',
    color: '#333',
    width: '100%',
  },
  submitButton: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50', // Green color
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '16px',
    width: '100%',
    marginTop: '20px', // Adds space between the fields and the button
  },
  successMessage: {
    color: 'black',
    fontSize: '16px',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default AddStudent;
