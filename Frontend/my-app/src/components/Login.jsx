import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Login = () => {
    // 1. State matching your model (username and password)
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Clear previous errors
        
        try {
            // 2. The API call to your backend
            // Make sure your backend route is exactly '/api/login' (or whatever you set in Thunder Client)
            const response = await axios.post('http://localhost:5000/api/v1/users/login', formData);

            // 3. Save the JWT Token
            // Your backend should return something like { token: "eyJhbG..." }
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                alert("Login Successful!");
                navigate('/chat'); // Redirect to the Chat Room
            }
        } catch (err) {
            // Handle errors (e.g., 401 Unauthorized or 404 Not Found)
            setError(err.response?.data?.message || 'Invalid username or password');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-5">
                    <div className="card shadow-sm border-0">
                        <div className="card-body p-4">
                            <h3 className="text-center mb-4">Welcome Back</h3>

                            {error && <div className="alert alert-danger text-center">{error}</div>}

                            <form onSubmit={handleLogin}>
                                {/* USERNAME */}
                                <div className="mb-3">
                                    <label className="form-label">Username</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        placeholder="Enter your username"
                                        required
                                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div className="mb-3">
                                    <label className="form-label">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Enter your password"
                                        required
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                </div>

                                <button type="submit" className="btn btn-primary w-100 py-2">
                                    Login to Chat
                                </button>
                            </form>

                            <div className="text-center mt-3">
                                <small>New here? <Link to="/register">Create an account</Link></small>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;