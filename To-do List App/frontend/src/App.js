import React, { useState, useEffect } from 'react';
import TodoApp from './TodoApp';
import Login from './Login';
import Register from './Register';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('token'));
  }, []);

  if (!isLoggedIn) {
    return showRegister ? (
      <Register onRegister={() => setShowRegister(false)} />
    ) : (
      <>
        <Login onLogin={() => setIsLoggedIn(true)} />
        <p style={{ textAlign: 'center' }}>
          Don't have an account?{' '}
          <button onClick={() => setShowRegister(true)}>Register</button>
        </p>
      </>
    );
  }

  return <TodoApp />;
}

export default App;