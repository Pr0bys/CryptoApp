import React, {useEffect, useState} from 'react';
import Spinner from './LoadingSpinner';
import empty from "../images/empty.png"

function News({user}) {

    const [newsapi, SetNewsapi] = useState("");
    const [statusLoad, setStatusLoad] = useState(false);

    useEffect(() => {
        if(user.isLoggedIn){
            const url = 'https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency&safeSearch=Off&textFormat=Raw&freshness=Day&count=15';

        const options = {
            method: 'GET',
            headers: {
              'X-BingApis-SDK': 'true',
              'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
              'X-RapidAPI-Key': ''
            }
          };
    
    
        fetch(url, options)
          .then(res => res.json())
          .then(data => 
            {
              SetNewsapi(data.value)
              setStatusLoad(true)
          }
          )
          .catch(err => console.error('error:' + err));
        }
    }, [user]);

    const clickCard = (urlTo) => {
      window.open(urlTo);
    }
    

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
    if(newsapi){
      return (
        <div style={{backgroundColor: '#F4F2F5', width: '100%'}}>
          <div style={{padding: "5% 5% 5% 5%"}}>
            <div className='containerforcard'>
              {
                newsapi.map((news, index) => {
                  return <div className='card' key={index} onClick={() => clickCard(news.url)}>
                    <div className='card_header'>
                      <img 
                        src={news.hasOwnProperty('image') ? (news.image.thumbnail?.contentUrl) : (empty)}
                        alt="card__image" className="card__image" 
                        width="100"
                      />
                      <img 
                        src={news.hasOwnProperty('provider') ? (news.provider[0]?.image?.thumbnail?.contentUrl) : (empty)}
                        alt="provider"
                        width="50" style={{float: 'right'}}
                      />
                    </div>
                    <div className='card_body'>
                    <h4>{news.name}</h4>
                    <p>{news.description}</p>
                  </div>
                  </div>
                })
              }
            </div>
          </div>
        </div>
      )
    }
  
}

export default News