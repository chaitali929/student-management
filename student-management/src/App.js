import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loginpage from "./components/pages/Loginpage";
import Studentpage from "./components/pages/Studentspage"; // Adjust path as needed
import AddStudent from "./components/pages/AddStudent";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Loginpage />} />
        <Route path="/studentpage" element={<Studentpage />} />
        <Route path="/addstudent" element={<AddStudent />} />
      </Routes>
    </Router>
  );
}

export default App;