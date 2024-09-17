import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/loginPage';  // ודא שהשמות תואמים
import RegisterPage from './pages/registerPage';  // ודא שהשמות תואמים
import ProfilePage from './pages/ProfilePage';  // דף פרופיל
import ShiftsPage from './pages/ShiftsPage';  // דף משמרות

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/shifts" element={<ShiftsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
