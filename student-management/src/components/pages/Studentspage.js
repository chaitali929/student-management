import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase'; // Assuming firebase config is in firebase.js
import { collection, getDocs } from 'firebase/firestore';

const Studentspage = () => {
  const navigate = useNavigate();
  const [students, setStudents] = useState([]); // State to store student data
  const [showTable, setShowTable] = useState(false);

  // Fetch student data from Firestore
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'students'));
        const studentsList = querySnapshot.docs.map(doc => ({
          id: doc.id,  // The Firestore document ID
          ...doc.data() // Spread the student data
        }));
        setStudents(studentsList); // Store the student data in state
      } catch (error) {
        console.error('Error fetching students:', error);
      }
    };

    fetchStudents();
  }, []); // Empty dependency array means this runs once when the component mounts

  const handleLogout = () => {
    navigate('/'); // Redirect to the login page
  };

  const handleStudentsClick = () => {
    setShowTable(true);
  };

  const handleAddStudentClick = () => {
    navigate('/addstudent'); // Navigate to AddStudent page
  };

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <ul style={styles.menu}>
          <li style={styles.menuItem} onClick={handleStudentsClick}>Students List</li>
          <li style={styles.menuItem} onClick={handleLogout}>Logout</li>
        </ul>
      </div>
      <div style={styles.content}>
        {showTable ? (
          <>
            <h1 style={styles.header}>Student's List</h1>
            <button style={styles.addButton} onClick={handleAddStudentClick}>Add Student</button>
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>Id</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Class</th>
                  <th style={styles.th}>Section</th>
                  <th style={styles.th}>Roll Number</th>
                  <th style={styles.th}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((student) => (
                  <tr key={student.id}>
                    <td style={styles.td}>{student.id}</td>
                    <td style={styles.td}>{student.firstName} {student.lastName}</td>
                    <td style={styles.td}>{student.class}</td>
                    <td style={styles.td}>{student.section}</td>
                    <td style={styles.td}>{student.rollNumber}</td>
                    <td style={styles.td}>
                      {/* Add actions such as edit or delete */}
                      <button style={styles.actionButton}>View</button>
                      <button style={styles.actionButton}>Edit</button>
                      <button style={styles.actionButton}>Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : (
          <h1>Welcome to the Students Page</h1>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    height: "100vh",
  },
  sidebar: {
    width: "200px",
    backgroundColor: "#f4f4f4",
    boxShadow: "2px 0 5px rgba(18, 16, 16, 0.1)",
    padding: "20px",
  },
  menu: {
    listStyleType: "none",
    padding: 0,
    margin: 0,
  },
  menuItem: {
    marginBottom: "15px",
    padding: "10px",
    backgroundColor: "#333",
    color: "#fff",
    borderRadius: "4px",
    textAlign: "center",
    cursor: "pointer",
  },
  content: {
    flex: 1,
    padding: "20px",
  },
  header: {
    textAlign: "center",
    marginBottom: "20px",
  },
  addButton: {
    display: "block",
    margin: "10px 0",
    padding: "10px 20px",
    backgroundColor: "#4CAF50", // Green color
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "16px",
  },
  table: {
    width: "100%",
    borderCollapse: "collapse",
    marginTop: "20px",
  },
  th: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
    backgroundColor: "#f2f2f2",
  },
  td: {
    border: "1px solid #ddd",
    padding: "8px",
    textAlign: "center",
  },
  actionButton: {
    margin: "0 5px",
    padding: "5px 10px",
    backgroundColor: "#007bff", // Blue color
    color: "#fff",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Studentspage;