import axios from 'axios';
import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';

function FormRegister({user}) {

    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        password2: '',
    });

    const navigate = useNavigate();

    const {username, email, password, password2} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }));
    }

    useEffect(() => {
        if(user.isLoggedIn){
            navigate("/");
        }
    }, [user, navigate])

    const onSubmit = async (e) => {
        e.preventDefault();

        if(password !== password2){
            toast.error('Passwords do not match');
        }
        else{
            const res = await axios.post('https://serverforcryptoapp.herokuapp.com/api/users/register', {username, email, password});
            toast(res.data.message);
            if(res.data.message === "Successfully registered"){
                navigate(`/login`);
            }
        }
    }

  return (
    <div style={{width: '100%'}}>
        <div className='form'>
        <h1>Sign Up</h1>
        <form onSubmit={onSubmit}>
            <input type="text"
            id="username" 
            name="username" 
            value={username}
            placeholder='Enter your username...'
            onChange={onChange}
            />

            <input type="email"
            id="email" 
            name="email" 
            value={email}
            placeholder='Enter your email...'
            onChange={onChange}
            />

            <input type="password"
            id="password" 
            name="password" 
            value={password}
            placeholder='Enter your password...'
            onChange={onChange}
            />

            <input type="password"
            id="password2" 
            name="password2" 
            value={password2}
            placeholder='Confirm your password...'
            onChange={onChange}
            />


            <button type="submit">Submit</button>
        </form>
        </div>
    </div>
  )
}

export default FormRegister