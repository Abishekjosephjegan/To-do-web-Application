import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email, password
      });
      localStorage.setItem('token', res.data.token);
      onLogin(); // call back to load todo list
    } catch (err) {
      if (err.response && err.response.status === 401) {
      alert('Invalid email or password');
    }else {
      alert('Login failed');
    }
  }
};

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={loginUser}>

        <label>Email:</label>
        <input type="email" placeholder="Email"
          value={email} onChange={(e) => setEmail(e.target.value)} className='input-field' required />

        <label>Password:</label> 
        <input type="password" placeholder="Password"
          value={password} onChange={(e) => setPassword(e.target.value)} className='input-field' required />
        <button className='login-button' type="submit">Login</button>
      </form>
    </div>
  );
}

export default Login;