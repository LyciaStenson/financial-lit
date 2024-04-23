// RegistrationForm.js
import React, { FormEventHandler, useState } from 'react';
import { logInWithEmail } from '@/src/firebaseBridge';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async () => {
    logInWithEmail(email, password); 
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default LoginForm;
