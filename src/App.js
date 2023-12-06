import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import MainPage from './MainPage/MainPage';
import DogPage from './KindPage/DogPage';
import LocalPage from './LocalPage/LocalPage';
import Board from "./CommunityPage/Board";
import Login from './LoginPage/Login';


function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<MainPage />} />
        <Route path="/local" element={<LocalPage />} />
        <Route path="/dog-page" element={<DogPage />}  />
        <Route path="/board" element={<Board />}  />
        <Route path="/login" element={<Login />} />
      </Routes>
  </Router>
  );
}

export default App;
