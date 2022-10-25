import React from 'react';
import millify from 'millify';
import {useNavigate} from 'react-router-dom';

function CryptoShowTable(props) {
    const cryptos = props.cryptos;
    const navigate = useNavigate(); 

    const handleRowClick = (coin) => {
        navigate(`/crypto/${coin.uuid}`);
    }

  return (
    <table className="tableCrypto">
                <thead>
                    <tr>
                        <th>CRYPTOCURRENCY</th>
                        <th>PRICE</th>
                        <th>MARKET CAP</th>
                        <th>DAILY CHANGE</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cryptos.map((coin) => {
                            return <tr className='coinLine' key={coin.uuid} onClick={() => handleRowClick(coin)} style={{cursor: 'pointer'}}>
                                <td>{coin.rank}.<img src={coin.iconUrl} width={25} height={25} alt="coin icon" />{coin.name}</td>
                                <td>{millify(coin.price)}</td>
                                <td>{millify(coin.marketCap)}</td>
                                <td>{coin.change}</td>
                            </tr>
                        })
                    }
                </tbody>
            </table>
  )
}

export default CryptoShowTable