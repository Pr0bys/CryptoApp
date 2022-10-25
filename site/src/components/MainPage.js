import React from 'react';
import { Link } from 'react-router-dom';
import Cryptocurrencies from './Cryptocurrencies';
import millify from 'millify';

function MainPage(props) {
    const {globalStats} = props;
    const simplified = true;
  return (
    <div style={{backgroundColor: '#F4F2F5', width: '100%'}}>
        <div style={{padding: "0 5% 5% 5%"}}>
        <div>
            <p style={{marginTop: "0%", fontSize: '24px', paddingTop: '3%'}}>Global Crypto Stats</p>
            <div className='globalStats'>
                <div style={{ width:'50%', display:'inline-block'}}>
                    <div>
                        <p style={{fontWeight: "550", color: '#9B9A9C', fontSize: '16px'}}>Total Cryptocurrencies</p>
                        <p>
                            {millify(globalStats.total)}
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: "550", color: '#9B9A9C', fontSize: '16px'}}>Total Market Cap</p>
                        <p>
                        {"$"+millify(globalStats.totalMarketCap)}
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: "550", color: '#9B9A9C', fontSize: '16px'}}>Total Markets</p>
                        <p>
                        {millify(globalStats.totalMarkets)}
                        </p>
                    </div>
                </div>

                <div style={{ width:'50%', display:'inline-block'}}>
                    <div>
                        <p style={{fontWeight: "550", color: '#9B9A9C', fontSize: '16px'}}>Total Exchanges</p>
                        <p>
                        {globalStats.totalExchanges}
                        </p>
                    </div>
                    <div>
                        <p style={{fontWeight: "550", color: '#9B9A9C', fontSize: '16px'}}>Total 24h Volume</p>
                        <p>
                        {"$"+millify(globalStats.total24hVolume)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <div style={{fontFamily: 'Arial'}}>
            <div style={{display: 'inline-block', width: '95%'}}>
                <p style={{float: 'left', fontSize: '20px', fontWeight: 'bold'}}>Top 15 Cryptocurrencies in the world</p>
                <span style={{float: 'right', fontSize: '18px', fontWeight: 'bold'}}>
                    <Link to="/cryptocurrencies" style={{textDecoration: 'none'}}><p style={{color: '#088FBD'}}>Show More</p></Link>
                </span>
            </div>

            <Cryptocurrencies coins={props.coins} simplified={simplified} />
        </div>
        </div>
    </div>
  )
}

export default MainPage