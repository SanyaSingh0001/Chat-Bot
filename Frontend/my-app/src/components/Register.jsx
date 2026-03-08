import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
  // 1. State keys must match your Backend Model keys exactly
  const [formData, setFormData] = useState({ 
    name: '', 
    username: '', 
    password: '' 
  });
  
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      // 2. Sending the object { name, username, password }
      await axios.post('http://localhost:5000/api/v1/users/register', formData);
      alert("Registration Successful! Please Login.");
      navigate('/login'); 
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h3 className="text-center mb-4">Create Account</h3>
              
              {error && <div className="alert alert-danger">{error}</div>}

              <form onSubmit={handleRegister}>
                {/* NAME FIELD */}
                <div className="mb-3">
                  <label className="form-label">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="John Doe"
                    required
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                {/* USERNAME FIELD */}
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input 
                    type="text" 
                    className="form-control" 
                    placeholder="johndoe123"
                    required
                    onChange={(e) => setFormData({...formData, username: e.target.value})}
                  />
                </div>

                {/* PASSWORD FIELD */}
                <div className="mb-3">
                  <label className="form-label">Password</label>
                  <input 
                    type="password" 
                    className="form-control" 
                    placeholder="Minimum 6 characters"
                    required
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">Register</button>
              </form>

              <div className="text-center mt-3">
                <small>Already a member? <Link to="/login">Login</Link></small>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;