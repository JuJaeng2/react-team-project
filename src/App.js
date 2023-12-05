import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import LocalPage from './LocalPage/LocalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/local" element={<LocalPage />} />
        <Route path="/" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
