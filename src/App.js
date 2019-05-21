import React from 'react';
import './App.css';
import CurrencyManager from "./components/CurrencyManager";
import myRequest from "./testrequest";

function App() {

  return (
      <div>
        <CurrencyManager/>
        {/*{myRequest()}*/}
      </div>
  );
}

export default App;
