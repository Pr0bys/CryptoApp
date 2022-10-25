import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {AiOutlineHome, AiOutlineUser} from 'react-icons/ai';
import {BiMoney} from 'react-icons/bi';
import {FaSignInAlt, FaSignOutAlt} from 'react-icons/fa';
import {MdAppRegistration} from 'react-icons/md';

function AppBar({user}) {
  const navigate = useNavigate();
  const logout = () =>{
    localStorage.removeItem('user');
    navigate("/");
    window.location.reload();
  }
  return (
      <div className='appbar'>
        <div style={{display: 'flex', margin: '0 auto'}}>
          <Link to="/"><p><AiOutlineHome />Home</p></Link>
          <Link to="/cryptocurrencies"><p><BiMoney />Cryptocurrencies</p></Link>
          <Link to="/exchanges"><p>Exchanges</p></Link>
          <Link to="/news"><p>News</p></Link>
        </div>
          {
            user.isLoggedIn ? 
            (<div style={{display: 'flex', float: 'right'}}>
              <p style={{color: 'white'}}> <AiOutlineUser /> {user.username}</p>
              <button onClick={logout}> <FaSignOutAlt /> Sign Out</button>
            </div>)
            :
            (
            <div style={{display: 'flex', float: 'right'}}>
          <Link to="/login">
            <button> <FaSignInAlt /> Sign In</button>
          </Link>
          <Link to="/register">
            <button> <MdAppRegistration /> Sign Up</button>
          </Link>
          </div>
          )
          }
      </div>
  )
}

export default AppBar