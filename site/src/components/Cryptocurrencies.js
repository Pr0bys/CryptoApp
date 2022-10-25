import React, { useEffect, useState } from 'react';
import Spinner from './LoadingSpinner';
import {AiOutlineSwitcher} from "react-icons/ai";
import CryptoShowCard from './CryptoShowCard';
import CryptoShowTable from './CryptoShowTable';

function Cryptocurrencies(props) {

    const [searchTerm, setSearchTerm] = useState('');
    const {coins, simplified} = props;
    const styleForsimplified = simplified ? {} : {backgroundColor: '#F4F2F5', margin: "0% 0% 5% 5% "}
    // const [cryptos, setCryptos] = useState();
    const [params, setParams] = useState({
        view: document.cookie === 'viewCrypto=true' ? true:false,
        statusLoad: false,
        cryptos: ""
    })

    useEffect(() => {
        let fillteredData = coins.filter(coin => {
            return coin.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        fillteredData = simplified ? fillteredData.slice(0,15) : fillteredData;
        setParams(params => ({
            ...params,
            cryptos: fillteredData
        }));
        setParams(params => ({
            ...params,
            statusLoad: true
        }));
    }, [coins, simplified, searchTerm])

    if(!params.statusLoad) {
        return <Spinner />
    }

    const changeView = () => {
        setParams(params => ({
            ...params,
            view: !params.view
        }));
        document.cookie = `viewCrypto=${!params.view}; expires=Fri, 31 Dec 9999 23:59:59 GMT`;
    }

  return (
    <div style={{width:"100%"}}>
        <div style={styleForsimplified}>
        {
            props.simplified ? <></> : (
                <div>
                    <h3 style={{marginTop: "0%", paddingTop: "3%"}}>Top 100 Cryptocurrencies in the world</h3>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" style={{border: '1px solid #0BBAE3', outline: 'none', padding: '5px', marginBottom: '3%'}} placeholder="Search..." />
                </div>
            )
        }
        <AiOutlineSwitcher size="32px" onClick={changeView} style={{cursor: "pointer", display: 'block', backgroundColor: '#0C6EF7', marginBottom: '3%'}} color="#FFF" />

        {
            params.view ? (
                <CryptoShowTable cryptos={params.cryptos}  />
            ) : 
            (
                <CryptoShowCard cryptos={params.cryptos} />
            )
                       
        }
        </div>
        </div>
  )
}

export default Cryptocurrencies