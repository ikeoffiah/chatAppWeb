// src/index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';  // Import BrowserRouter
import App from './App';  // Your main App component

ReactDOM.render(
  <BrowserRouter>  {/* Wrap the App in BrowserRouter */}
    <App />
  </BrowserRouter>,
  document.getElementById('root')
);
