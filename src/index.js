import React from 'react';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom';
import { createRoot } from 'react-dom/client';  // Import createRoot from react-dom/client
import CartContextProvider from './cartext';

const root = document.getElementById('root');

// Use createRoot to render your application
const rootElement = createRoot(root);

rootElement.render(
  <CartContextProvider>
    <Router>
      <App />
    </Router>
  </CartContextProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
