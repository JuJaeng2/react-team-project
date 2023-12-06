import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import DogPage from './KindPage/DogPage';
import LocalPage from './LocalPage/LocalPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/local" element={<LocalPage />} />
        <Route path="/" element={<MainPage />} />
        <Route path="/dog-page" element={<DogPage />}  />
      </Routes>
  </Router>
  );
}

export default App;
