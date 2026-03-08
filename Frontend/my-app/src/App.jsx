import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Chat from './components/chat';

const ProtectedRoute = ({ children }) => {
          const token = localStorage.getItem('token');
          return token ? children : <Navigate to="/login" />;
        };
function App() {
  return (
    <Router>
      <Routes>
        {/* Redirect empty path to login */}
        <Route path="/" element={<Navigate to="/login" />} />
        
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        
        {/* Temporary Chat Room placeholder */}
        
        <Route path="/Chat" element={
            <ProtectedRoute>
          <Chat />
            </ProtectedRoute>
        } />
      </Routes>
    </Router>
  );
}

export default App;