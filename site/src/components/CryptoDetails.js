import React, { useEffect, useState } from 'react'
import Spinner from './LoadingSpinner'; 
import { Link, useParams } from 'react-router-dom';
import millify from 'millify';
import {AiOutlineRollback} from 'react-icons/ai';
import Sparkline from './Sparkline';



function CryptoDetails() {
    const [statusLoad, setStatusLoad] = useState(false);
    const [coinDetails, setCoinDetails] = useState("s");
    const [coinHistory, setCoinHistory] = useState("");
    const [timePeriod, setTimePeriod] = useState("7d")
    const params = useParams();

    useEffect(() => {
      const url = `https://coinranking1.p.rapidapi.com/coin/${params.id}?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=7d`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
          'X-RapidAPI-Key': 'Key'
        }
      };

    fetch(url, options)
      .then(res => res.json())
      .then(data => 
        {
        setCoinDetails(data.data.coin);
        setStatusLoad(true);
      }
      )
      .catch(err => console.error('error:' + err));
      
    }, [params.id]);

    useEffect(() => {
      const url = `https://coinranking1.p.rapidapi.com/coin/${params.id}/history?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=${timePeriod}`;

      const options = {
        method: 'GET',
        headers: {
          'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
          'X-RapidAPI-Key': ''
        }
      };

      fetch(url, options)
      .then(res => res.json())
      .then(data => 
        {
        setCoinHistory(data.data);
        setStatusLoad(true);
      }
      )
      .catch(err => console.error('error:' + err));

    }, [timePeriod, params.id])

    const changeSelect = (e) => {
      setTimePeriod(e.target.value);
    }

    if(!statusLoad) {
      return <Spinner />
    }
    try{
      return (
        <div>
            <div style={{padding: '5% 5% 5% 5%'}}>
              <Link to="/cryptocurrencies">
              <AiOutlineRollback size="32px" style={{cursor: "pointer", display: 'block', backgroundColor: '#0C6EF7', marginBottom: "3%"}} color="#FFF" />
              </Link>
    
                <h3 style={{marginTop: '0%'}}><img src={coinDetails.iconUrl} width={25} height={25} alt="coin icon" />{coinDetails.name} Details</h3>
                <hr />
    
                <h4>Rank: {coinDetails.rank}</h4>
                <hr />
    
                <h4>Price: {millify(coinDetails.price)}</h4>
                <hr />
    
                <h4>24 Hour Volume: {millify(Object.values(coinDetails)[14])}</h4>
                <hr />
    
                <h4>Market Cap: {millify(coinDetails.marketCap)}</h4>
                <hr />
    
                <h4>Tier: {coinDetails.tier}</h4>
                <hr />
    
                <h4>Change: {coinDetails.change}</h4>
                <hr />

                <select value={timePeriod} onChange={changeSelect}>
                  <option value="24h">24h</option>
                  <option value="7d">7d</option>
                  <option value="30d">30d</option>
                </select>
    
                <Sparkline coinHistory={coinHistory} />
            </div>
        </div>
      )
    } catch{
      return <div>
        <h1>Too many request</h1>
        <Link to="/">
            <button>Return to home page</button>
        </Link>
      </div>
    }
}

export default CryptoDetails