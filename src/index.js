import React from 'react';
import ReactDOM from 'react-dom/client'; // Note the use of 'react-dom/client' for React 18+
import './index.css'; // Import global styles if you have any
import App from './App'; // Import the main App component

// Create the root element and render the App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
