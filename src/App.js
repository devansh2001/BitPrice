import React from 'react';
import './App.css';
import CurrencyManager from "./components/CurrencyManager";
import myRequest from "./testrequest";
import Header from "./components/Header";

function App() {

  return (
      <div>
        <Header/>
        <CurrencyManager/>
        {/*{myRequest()}*/}
      </div>
  );
}

export default App;
