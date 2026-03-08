console.log("Hello, World!"); 
alert("Welcome to the ChatBot Application!");


import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Make sure this matches your new filename
import 'bootstrap/dist/css/bootstrap.min.css' // Import Bootstrap here!

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)