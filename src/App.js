import React from 'react';
import './App.css';
import CurrencyManager from "./components/CurrencyManager";
import Header from "./components/Header";
import {HashRouter, Route, Link} from 'react-router-dom';

function App() {

  return (
      <HashRouter basename='/'>
        <div>
          <Header/>
          <CurrencyManager/>
        </div>
      </HashRouter>
  );
}

export default App;
