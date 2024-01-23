import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { StoreProvider } from 'easy-peasy';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <StoreProvider store = {store}>
      <Router>
        <Routes>
          <Route path="/*" element={ <App />} />
        </Routes>
      </Router>
    </StoreProvider>
  </React.StrictMode>
);

//npx json-server -p 3500 -w data/db.json -> for hosting json server
//npm start -> for react app to host 