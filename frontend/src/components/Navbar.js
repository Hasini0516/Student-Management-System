import React from 'react';
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="logo">Student Management</h1>
      <div className="links">
        <Link to="/">Home</Link>
        <Link to="/students">Students</Link>
        <Link to="/add">Add Student</Link>
      </div>
    </nav>
  );
};

export default Navbar;