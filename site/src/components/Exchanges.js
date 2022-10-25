import React, {useEffect, useState} from 'react';
import Spinner from './LoadingSpinner';
import millify from 'millify';

function Exchanges({user}) {

    const [exc, SetExc] = useState("");
    const [statusLoad, setStatusLoad] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if(user.isLoggedIn){
            
            const url = 'https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/exchanges?referenceCurrencyUuid=yhjMzLPhuIDl&limit=100&offset=0&orderBy=24hVolume&orderDirection=desc';

            const options = {
              method: 'GET',
              headers: {
                'X-RapidAPI-Host': 'coinranking1.p.rapidapi.com',
                'X-RapidAPI-Key': 'key'
              }
            };

        fetch(url, options)
          .then(res => res.json())
          .then(data => 
            {
              SetExc(data.data.exchanges)
              setStatusLoad(true)
          }
          )
          .catch(err => console.error('error:' + err));
        }
    }, [user]);

    if(!user.isLoggedIn){
        return (
            <div style={{width: '100%', height:"50vh", justifyItems: "center"}}>
                <div style={{padding: '5%'}}>
                <h2>You must be logged in to view the news</h2>
                </div>
            </div>
        )
    }

    if(!statusLoad) {
      return <Spinner />
    }
    
    const onChangeSearch = (e) => {
        setSearchTerm(e.target.value);
        let fillteredData = exc.filter(ex => {
            return ex.name.toLowerCase().includes(searchTerm.toLowerCase())
        })
        SetExc(fillteredData);
    }

  return (
    <div style={{width:"100%"}}>
        <div style={{padding: "5%"}}>
        <input value={searchTerm} onChange={onChangeSearch} type="text" style={{border: '1px solid #0BBAE3', outline: 'none', padding: '5px', marginBottom: '3%'}} placeholder="Search..." />
        <table className="tableCrypto">
            <thead>
                <tr>
                    <th>EXCHANGES</th>
                    <th>24H TRADE VOLUME</th>
                    <th>MARKETS</th>
                </tr>
            </thead>
            <tbody>
                {
                    exc.map((ex) => {
                        return <tr className='coinLine' key={ex.uuid}>
                            <td>
                            {ex.rank}.<img src={ex.iconUrl} width={25} height={25} alt="ex icon" />{ex.name}
                            </td>
                            <td>
                                {millify(Object.values(ex)[9])}
                            </td>
                            <td>
                                {ex.numberOfMarkets}
                            </td>
                        </tr>
                    })
                }
            </tbody>
        </table>
        </div>
    </div>
  )
}

export default Exchanges