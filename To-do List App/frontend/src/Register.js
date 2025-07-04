import React, { useState } from 'react';
import axios from 'axios';

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', {
        email, password
      });
      alert('Registration successful. Please log in.');
      onRegister();
    } catch (err) {
      alert('Registration failed');
    }
  };

  return (
    <div className="container">
      <h2>Register</h2>
      <form onSubmit={registerUser}>
        <label>Email:</label>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} className='input-field' required />
        <label>Password:</label>
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} className='input-field' required />
        <button type="submit">Register</button>
        <button type="button" onClick={onRegister} className='cancel-button'>Cancel</button>
      </form>
    </div>
  );
}

export default Register;