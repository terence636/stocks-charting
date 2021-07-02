import React, {useEffect, useState} from 'react'
import Plot from 'react-plotly.js';
// import Chart from "react-google-charts";
import stockData from './stockData.js'

const baseURL = `http://www.alphavantage.co/query?`
const functionType = 'function=TIME_SERIES_DAILY_ADJUSTED'
const symbol = '&symbol=BABA'
const outputSize = '&outputsize=compact'
const apiKey = '&apikey=XW0YLMZBBXDYRUEK'
const apiKeyDemo = 'demo'
const URL = baseURL + functionType + symbol + outputSize + apiKey

// const stockXValues = []
// const stockYValues = []
let stockXYValues = []
const allPoints = []


const Main = () => {
    // Your State is here
    const [dataPoints, setDataPoints] = useState([])

    //Fetch data here
    useEffect(()=> {
        fetch(URL)
        .then((res) => {
            console.log(res);
              return res.json()
          })
          .then((data) => {
            console.log("data", data);
            
            // Collect date and price point
            for(let key in data['Time Series (Daily)']) {

                stockXYValues.push(new Date(key))
                stockXYValues.push(data['Time Series (Daily)'][key]['4. close'])
                allPoints.push(stockXYValues)
                stockXYValues = []
            }
            //setState
            // setDataPoint({stockXValues,stockYValues})
            setDataPoints(allPoints)
            console.log("allPoints",allPoints)
          })  

    },[])
    
    // console.log(...dataPoints)
    if(dataPoints === [])
      return


    return (
        <div>
            <h1>Stocks</h1>
   
            <Plot
            data={[
            {
            x: [1, 2, 3],
            y: [2, 6, 3],
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          },
          {type: 'bar', x: [1, 2, 3], y: [2, 5, 3]},
        ]}
        layout={ {width: 320, height: 240, title: 'A Fancy Plot'} }
      />
        </div>
    )
    
}

export default Main
