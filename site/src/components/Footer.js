import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className='footer'>
        <p>Copyright © 2022</p>
        <p>For business: aaw1812g.clepa.rodion@gmail.com</p>
        <div style={{display: "flex", justifyContent:"center"}}>
            <Link to="/"><p>Home</p></Link>
            <Link to="/cryptocurrencies"><p>Cryptocurrencies</p></Link>
            <Link to="/exchanges"><p>Exchanges</p></Link>
            <Link to="/news"><p>News</p></Link>
        </div>
    </div>
  )
}

export default Footer