import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn } from '../../store/features/userSlice';


const Login = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event : React.FormEvent) => {
        event.preventDefault();
        dispatch(signIn({ email, password }));
        navigate('/character-list');
    };

    return (

            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="email" value={email} onChange={(event)=> setEmail(event.target.value)}/>
                <input type="text" placeholder="password"  value={password} onChange={(event)=> setPassword(event.target.value)}/>
                <button type="submit">Login</button>
            </form>
    );
}

export default Login;