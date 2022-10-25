import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


function FormLogin({user}) {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const navigate = useNavigate();

    useEffect(() => {
        if(user.isLoggedIn){
            navigate("/");
        }
    }, [user, navigate])

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    const onSubmit = async (e) => {
        e.preventDefault();
        if(!email || !password){
            return toast.error("Please fill in all fields");
        }
        const res = await axios.post('https://serverforcryptoapp.herokuapp.com/api/users/login', {email, password});

            if(res.status === 201){
                localStorage.setItem('user', JSON.stringify(res.data.token));
                navigate(`/`);
                window.location.reload();
            }
            else{
                toast.error(res.data.message);
            }

    }

  return (
    <div style={{width: '100%'}}>
        <div className='form'>
            <h1>Sign In</h1>
            <form onSubmit={onSubmit}>
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

            <button type="submit">Submit</button>

            </form>
        </div>
    </div>
  )
}

export default FormLogin