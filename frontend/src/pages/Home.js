import React from 'react';
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Student Management System</h1>
      <div className="actions">
        <Link to="/students" className="btn">View Students</Link>
        <Link to="/add" className="btn">Add New Student</Link>
      </div>
    </div>
  );
};

export default Home;