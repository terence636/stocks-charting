import React from "react";
import Main from "./components/Main"

// import dotenv from 'dotenv'
// dotenv.config()

function App() {
  const apiKey = process.env.REACT_APP_VANTAGE_API_KEY
  console.log("apikey at app",apiKey)
  return (
    <div>
      <Main />
    </div>
  );
}


export default App
