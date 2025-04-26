import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllStudents, deleteStudent } from '../services/api';

const StudentList = () => {
  const [students, setStudents] = useState([]); // Initialize as empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const response = await getAllStudents();
        // Ensure response.data is an array
        if (Array.isArray(response.data)) {
          setStudents(response.data);
        } else {
          setStudents([]); // Fallback to empty array
          console.error('Expected array but got:', response.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this student?')) {
      try {
        await deleteStudent(id);
        setStudents(students.filter(student => student._id !== id));
      } catch (err) {
        setError('Failed to delete student');
      }
    }
  };

  if (loading) return <div className="loading-spinner">Loading...</div>;
  if (error) return <div className="error-message">Error: {error}</div>;

  return (
    <div className="student-list">
      <h1>Student List</h1>
      {students.length === 0 ? (
        <p>No students found</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student._id}>
                <td>{student.studentId}</td>
                <td>{student.firstName} {student.lastName}</td>
                <td>{student.email}</td>
                <td>{student.department}</td>
                <td>
                  <Link to={`/edit/${student._id}`} className="btn-edit">Edit</Link>
                  <button 
                    onClick={() => handleDelete(student._id)} 
                    className="btn-delete"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default StudentList;