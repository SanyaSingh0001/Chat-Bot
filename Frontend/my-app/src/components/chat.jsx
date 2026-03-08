// src/components/Chat.jsx
import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';
import { useNavigate } from 'react-router-dom';

// Chat component ke andar:

const token = localStorage.getItem('token');
const socket = io("http://localhost:5000" ,{ auth: { token } }); // Backend URL

function chat() {
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const [chatLog, setChatLog] = useState([]);




const handleLogout = () => {
    localStorage.removeItem("token"); // Token khatam!
    // Optional: socket.disconnect(); // Connection band karne ke liye
    navigate("/login"); // Wapas ghar (login) bhejo
};


    useEffect(() => {
        // Backend se message receive karna
        socket.on("message", (msg) => {
            setChatLog((prev) => [...prev, msg]);
        });

        return () => socket.off("message"); // Cleanup
    }, []);

    const sendMessage = (e) => {
        e.preventDefault();
        if (message) {
            socket.emit("message", message); // Backend ko bhej raha hai
            setMessage("");
        }
    };

    return (
        <div className="container mt-5">
            
    <div className="chat-container">
        {/* Top Header/Navbar */}
        <nav className="navbar navbar-dark bg-dark p-3 d-flex justify-content-between">
            <h4 className="text-white">Chat Room</h4>
            <button className="btn btn-danger btn-sm" onClick={handleLogout}>
                Logout
            </button>
        </nav>

        {/* Aapka baaki Chat UI yahan niche aayega */}
        <div className="messages-box mt-4">
             {/* ... messages list ... */}
        </div>
    </div>

            <div className="card">
                <div className="card-body" style={{height: '300px', overflowY: 'scroll'}}>
                    {chatLog.map((msg, i) => <p key={i}>{msg}</p>)}
                </div>
                <form onSubmit={sendMessage} className="d-flex p-2">
                    <input 
                        className="form-control"
                        value={message} 
                        onChange={(e) => setMessage(e.target.value)} 
                    />
                    <button className="btn btn-primary ml-2">Send</button>
                </form>
            </div>
        </div>
    );
}

export default chat;