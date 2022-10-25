import React, { useEffect, useState } from 'react';
import './App.css';
import MainPage from './components/MainPage';
import Cryptocurrencies from './components/Cryptocurrencies';
import "./styles/style.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import CryptoDetails from './components/CryptoDetails';
import Spinner from './components/LoadingSpinner';
import AppBar from './components/AppBar';
import Footer from './components/Footer';
import FormRegister from './components/FormRegister';
import FormLogin from './components/FormLogin';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import News from './components/News';
import Exchanges from './components/Exchanges';

function App() {

  const [api, setAPI] = useState("");
  const [statusLoad, setStatusLoad] = useState(false);

  const userToken = JSON.parse(localStorage.getItem('user'));
  // const userToken="";

  const [user, setUser] = useState({
    username: "",
    isLoggedIn: false
  });

  useEffect(() => {

    const url = 'https://coinranking1.p.rapidapi.com/coins?referenceCurrencyUuid=yhjMzLPhuIDl&timePeriod=24h&tiers%5B0%5D=1&orderBy=marketCap&orderDirection=desc&limit=100&offset=0';

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
        setAPI(data)
        setStatusLoad(true)
      }
      )
      .catch(err => console.error('error:' + err));

      const verify= async () => {

        const res = await axios.get("https://serverforcryptoapp.herokuapp.com/api/users/verify", {
          headers: {
            'Authorization': `Bearer ${userToken}`
          }
        });

        if(res.data.isLoggedIn){
          setUser({
            username: res.data.username,
            isLoggedIn: res.data.isLoggedIn
          });
        }
      }
      if(userToken) verify();
      }, [userToken])

  if(!statusLoad) {
    return <Spinner />
  }

  return (
    <div>
      <BrowserRouter>
      <AppBar user={user} />
        <Routes>
          <Route path="/" element={<MainPage globalStats={api.data.stats} coins={api.data.coins} />} />
          <Route path="/cryptocurrencies" element={
          <Cryptocurrencies coins={api.data.coins} />
        }/>
          <Route path="/crypto/:id" element={<CryptoDetails />} />
          <Route path="/register" element={<FormRegister user={user} />} />
          <Route path="/login" element={<FormLogin user={user} />} />
          <Route path="/news" element={<News user={user} />} />
          <Route path="/exchanges" element={<Exchanges user={user} />} />
        </Routes>
        <Footer />
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
