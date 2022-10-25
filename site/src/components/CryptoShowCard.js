import React from 'react';
import {Link} from 'react-router-dom';
import millify from 'millify';

function CryptoShowCard(props) {
    const cryptos = props.cryptos;
  return (
    cryptos.map((coin) => {
                    return <Link key={coin.uuid} to={`/crypto/${coin.uuid}`} style={{textDecoration: 'none', color: 'black'}}>
                    <div className='coinCard'>
                        <p>{coin.rank}<img src={coin.iconUrl} width={25} height={25} alt="coin icon" />.{coin.name}</p>
                        <hr />
                        <p>Price:{millify(coin.price)}</p>
                        <p>Market Cap:{millify(coin.marketCap)}</p>
                        <p>Daily Change:{coin.change}</p>
                    </div>
                    </Link>
    })
  )
}

export default CryptoShowCard