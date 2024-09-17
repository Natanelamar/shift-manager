import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../API/api'; // נתיב קובץ ה-API
import '../styles/registerPage.css';  // ייבוא הקובץ CSS

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register({ email, password }); // השתמש בפונקציה register
      navigate('/'); // מעביר לעמוד הלוגין
    } catch (err) {
      setError('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-page">
      <h2>Register</h2>
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
      <button onClick={handleRegister}>Register</button>
      {error && <p>{error}</p>}
      <p>Already have an account? <a href="/">Login</a></p>
    </div>
  );
};

export default RegisterPage;
