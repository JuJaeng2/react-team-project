import React from 'react';
import './App.css';
import MainPage from './MainPage/MainPage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import DogPage from './KindPage/DogPage';




function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<MainPage />} />
      <Route path="/dog-page" element={<DogPage />} />
    </Routes>
  </Router>
  );
}

export default App;
