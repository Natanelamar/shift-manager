import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../API/api'; // נתיב קובץ ה-API
import '../styles/loginPage.css';  // ייבוא הקובץ CSS


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await loginUser({ email, password });
      navigate('/shifts'); // מעביר לעמוד השיפטים
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <div className="login-page">
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      {error && <p>{error}</p>}
      <p>Don't have an account? <a href="/register">Register</a></p>
    </div>
  );
};

export default LoginPage;
