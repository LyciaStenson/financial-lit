import React, { useState } from 'react';
import { createUserWithPassword } from '@/src/firebaseBridge';

const RegistrationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleRegister = async () => {
        console.log(email);
        await createUserWithPassword(email, password);
    };

    return (
        <div>
            <form onSubmit={handleRegister} className='flex flex-col justify-center items-center'>
                <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default RegistrationForm;