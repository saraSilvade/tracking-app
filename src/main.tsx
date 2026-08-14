import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);


/*Vite's entry point is index.html, and inside index.html,
 it looks for a file called src/main.tsx to launch React */