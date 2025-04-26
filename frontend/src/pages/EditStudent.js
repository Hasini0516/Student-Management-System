import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getStudentById, updateStudent } from '../services/api';

const EditStudent = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    studentId: '',
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    department: '',
    enrollmentYear: '',
    isActive: true
  });

  useEffect(() => {
    const fetchStudent = async () => {
      try {
        const response = await getStudentById(id);
        setFormData(response.data);
      } catch (error) {
        alert('Error fetching student data');
      }
    };
    fetchStudent();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateStudent(id, formData);
      alert('Student updated successfully');
      navigate('/students');
    } catch (error) {
      alert('Error updating student');
    }
  };

  return (
    <div className="edit-student">
      <h1>Edit Student</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Student ID:</label>
          <input 
            type="text" 
            name="studentId" 
            value={formData.studentId} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>First Name:</label>
          <input 
            type="text" 
            name="firstName" 
            value={formData.firstName} 
            onChange={handleChange} 
            required 
            minLength="2" 
          />
        </div>
        
        <div className="form-group">
          <label>Last Name:</label>
          <input 
            type="text" 
            name="lastName" 
            value={formData.lastName} 
            onChange={handleChange} 
            required 
            minLength="2" 
          />
        </div>
        
        <div className="form-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Date of Birth:</label>
          <input 
            type="date" 
            name="dob" 
            value={formData.dob} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Department:</label>
          <input 
            type="text" 
            name="department" 
            value={formData.department} 
            onChange={handleChange} 
            required 
          />
        </div>
        
        <div className="form-group">
          <label>Enrollment Year:</label>
          <input 
            type="number" 
            name="enrollmentYear" 
            value={formData.enrollmentYear} 
            onChange={handleChange} 
            required 
            min="2000" 
            max={new Date().getFullYear()} 
          />
        </div>
        
        <div className="form-group checkbox">
          <label>Active:</label>
          <input 
            type="checkbox" 
            name="isActive" 
            checked={formData.isActive} 
            onChange={handleChange} 
          />
        </div>
        
        <button type="submit" className="btn-submit">
          Update Student
        </button>
      </form>
    </div>
  );
};

export default EditStudent;