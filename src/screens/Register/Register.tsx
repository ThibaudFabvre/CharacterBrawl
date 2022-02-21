import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { SignUp } from '../../api/user/user.api';


const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const dispatch = useDispatch();
    
    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        dispatch(SignUp({email, password, name}));
    }

    return (
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
                <input type="text" placeholder="password"  value={password} onChange={(event)=> setPassword(event.target.value)}/>
                <input type="text" placeholder="name"  value={name} onChange={(event)=> setName(event.target.value)}/>
                <button type="submit">SIGN UP</button>
            </form>
    );
}

export default Register;