// src/main.jsx
// -----------------------------------------------------------------------------
// THE STARTING LINE OF OUR APP.
//
// Remember the empty <div id="root"></div> from index.html?
// This file finds that div and tells React: "Draw the <App /> component here."
//
// This is the only place in the whole project where we connect React to the
// real browser page. Everything else is pure React.
// -----------------------------------------------------------------------------

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Global styles that apply to the whole page (background, fonts, etc.).
import './index.css';

// 1. Find the empty <div id="root"> in index.html.
// 2. Create a React "root" attached to it.
// 3. Render our top-level <App /> component inside it.
ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> is a development-only helper. It does not render any
  // visible UI; it just warns us about common mistakes while we code.
  <React.StrictMode>
    <App />
  </React.StrictMode>
);