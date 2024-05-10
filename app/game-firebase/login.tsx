// RegistrationForm.js
'use client'

import React, { FormEventHandler, useState } from 'react';
import { signInWithEmail } from '@/src/firebaseBridge';

import { useRouter } from 'next/router';

const LoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const router = useRouter();

  const { query: 
    id,
  } = router;

  const prop = {
    id,
  }
  console.log(prop.id);

  const handleRegister = async () => {
    signInWithEmail(username, password); 
  };

  return (
    <form onSubmit={handleRegister}>
      <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <button type="submit">Register</button>
    </form>
  );
};

export default LoginForm;
