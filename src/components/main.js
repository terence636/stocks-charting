import React, { useEffect, useState } from "react";
import Plot from "react-plotly.js";
// import Chart from "react-google-charts";
import stockData from "../stockData.js";

const baseURL = `http://www.alphavantage.co/query?`;
const functionType = "function=TIME_SERIES_DAILY_ADJUSTED";
const symbol = "&symbol=BABA";
const outputSize = "&outputsize=compact";
const apiKey = "&apikey=" + process.env.REACT_APP_VANTAGE_API_KEY;
const apiKeyDemo = "demo";
const URL = baseURL + functionType + symbol + outputSize + apiKeyDemo;

console.log("apiKey", apiKey);
const stockXValuesFunction = [];
const stockYValuesFunction = [];
// let stockXYValues = []
// const allPoints = []

const Main = () => {
  // Your State is here
  const [dataPoints, setDataPoints] = useState(stockData);
  console.log("dataPoints", dataPoints);
  //Fetch data here
  useEffect(() => {
    fetch(URL)
      .then((res) => {
        console.log(res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);

        // Collect date and price point
        for (let key in data["Time Series (Daily)"]) {
          // stockXYValues.push(new Date(key))
          // stockXYValues.push(data['Time Series (Daily)'][key]['4. close'])
          // allPoints.push(stockXYValues)
          // stockXYValues = []
          stockXValuesFunction.push(key);
          stockYValuesFunction.push(
            data["Time Series (Daily)"][key]["4. close"]
          );
        }
        //setState
        // setDataPoint({stockXValues,stockYValues})
        // setDataPoints(allPoints)
        // console.log("allPoints",allPoints)
        // console.log("X",stockXValuesFunction)
        // console.log("Y",stockYValuesFunction)
      });
  }, []);

  // Collect date and price point
  for (let key in dataPoints["Time Series (Daily)"]) {
    // stockXYValues.push(new Date(key))
    // stockXYValues.push(data['Time Series (Daily)'][key]['4. close'])
    // allPoints.push(stockXYValues)
    // stockXYValues = []
    stockXValuesFunction.push(key);
    stockYValuesFunction.push(
      dataPoints["Time Series (Daily)"][key]["4. close"]
    );
  }
  console.log("X", stockXValuesFunction);
  console.log("Y", stockYValuesFunction);
  // console.log(...dataPoints)
  // if(dataPoints === [])
  //   return

  return (
    <div>
      <h1>Stocks</h1>
      
      <Plot
        data={[
          {
            x: stockXValuesFunction,
            y: stockYValuesFunction,
            type: "scatter",
            mode: "lines",
            name: "Lines",
            line: {
                dash: 'solid',
                width: 4
              },
            marker: { color: "blue" },
          },
        ]}
        layout={{ width:720, height: 440, title: dataPoints["Meta Data"]["2. Symbol"] }}
      />

      <p>X-Value: {stockXValuesFunction}</p>
      <p>Y-Value: {stockYValuesFunction}</p>
    </div>
  );
};

export default Main;
