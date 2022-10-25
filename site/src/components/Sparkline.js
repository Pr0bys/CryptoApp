import React from 'react';
import { Line } from 'react-chartjs-2';
// import {Char as ChartJS} from 'chart.js/auto';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


function Sparkline({coinHistory}) {
    const coinPrice=[];
    const coinTimestamp=[];

    for(let i=0; i< coinHistory?.history?.length; i++){
        coinPrice.push(coinHistory?.history[i].price);
        coinTimestamp.push(new Date(coinHistory?.history[i].timestamp*1000).toLocaleDateString());
    }

    const dataChart = {
        labels: coinTimestamp,
        datasets: [
            {
                label: 'Price in $',
                data: coinPrice
            }
        ]
    }

    const options = {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }

  return (
    <Line data={dataChart} options={options} />
  )
}

export default Sparkline