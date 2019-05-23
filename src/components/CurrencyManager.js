import React, {Component} from 'react'
import mappingCountryCurrency from '../currencyDataFiles/data.js'
import {Button, Select, MenuItem} from '@material-ui/core';


class CurrencyManager extends Component {
  constructor(props) {
    super(props);
    this.currencyData = mappingCountryCurrency;
    this.requestedCurrencies = [];
    this.oldRates = {
      "": 0.00
    };
    this.state = {
      currencyCode: 'AED',
      allData: [],
      dataMap: [],
      refreshRequested: false
    };
    this.recentUpdateTime = this.state.allData[0] ? this.state.allData['time']['updated'] : '';
    setInterval(this.handleRefresh, 60000);
    this.handleRequest('USD');
  }


  handleRequest =  async (code = this.state.currencyCode) => {
    let currencyPreviousRate = this.oldRates[code] || 0.0000;
    let currencyNewRate = 0.0000;
    let change = 0.00000000000000000000000;
    let changeColor = 'black';
    let bgColor = 'white';
    console.log(this.requestedCurrencies);
    let mainURL = 'https://api.coindesk.com/v1/bpi/currentprice/';
    let jsonWord = '.json';
    let endpoint = mainURL + code + jsonWord;
    let currData = {};
    await fetch(endpoint)
        .then(response => response.json())
        .then(data => {currData = data;
        console.log('OLD: ' + this.oldRates[code]);
        currencyNewRate = parseFloat(currData['bpi'][code]['rate'].replace(/[,]/, ''));
        this.oldRates[code] = currencyNewRate;
        change = (currencyNewRate - currencyPreviousRate) / currencyPreviousRate;
        console.log('Rates Below:----');
        console.log(currencyNewRate - currencyPreviousRate);
        console.log(currencyPreviousRate);
        console.log('----');
        console.log('INF: ' + isFinite(change));
        console.log('NaN: ' + isNaN(change));
        if (currencyPreviousRate == 0) {
          change = 0;
        }
        if (change > 0) {
          changeColor = 'green';
          bgColor ='#CAF2BC'
        } else if (change < 0) {
          changeColor = 'red';
          bgColor ='#F2BCBC'
        } else {
          changeColor = 'black';
          bgColor = 'white'
        }
        console.log('Changed Rate to ' + currencyNewRate);
        this.setState(prevState => ({
            allData: [...prevState.allData, data]
          }))}
        ).catch(e => console.log(e));
    this.recentUpdateTime = this.state.allData[0] ? this.state.allData[0]['time']['updated'] : '';
    console.log(currData);
    console.log('Yeah! I got this');
    change *= 100;
    await this.setState(prevState => ({
      dataMap: [...prevState.dataMap,
            <tr style={{backgroundColor: bgColor}}>
              <td className={'row-normal'}>{code}</td>
              <td className={'row-normal'}>{currencyPreviousRate}</td>
              <td className={'row-normal'}>{currencyNewRate}</td>
              <td className={'row-normal'}>{currencyPreviousRate == 0 ? 0 : (1/currencyPreviousRate)}</td>
              <td className={'row-normal'}>{1/currencyNewRate}</td>
              <td style={{color: changeColor}} className={'row-normal'}>{change.toPrecision(5)}%</td>
            </tr>
      ]
    }));
    console.log(this.state.allData);

    console.log('Old Rate: ' + currencyPreviousRate);
    console.log('New Rate: ' + currencyNewRate);
    console.log('Change Percent: ' + ((currencyNewRate - currencyPreviousRate) / currencyPreviousRate));
    console.log('Old array: ' + this.oldRates);
  };

  currencyIsPresent = async (e) => {
    e.preventDefault(e);
    if (this.requestedCurrencies.some(item => item === this.state.currencyCode)) {
      console.log('TRUE');
    } else {
      console.log('FALSE');
      await this.requestedCurrencies.push(this.state.currencyCode);
      await this.handleRequest();
      // this.setState({
      //   currencyCode: ''
      // });
    }
  };

  handleChange = (event) => {
    this.setState({
      currencyCode: event.target.value

      //currencyCode: event.target.value.toUpperCase()
    })
  };


  handleRefresh = async () => {
    await this.setState({
      dataMap: [],
      allData: []
    });
    await console.log('Set state');
    this.handleRequest('USD');
    for (let i = 0; i < this.requestedCurrencies.length; i++) {
      await this.handleRequest(this.requestedCurrencies[i]);
    }
    await console.log('Handled Requests');
  };


  render() {
    console.log('Rendering');
    return (
        <div className='currency-manager'>
          <form className={'input-form'} onSubmit={this.currencyIsPresent}>
            Select Currency:
            <Select className={'form-field'} value={this.state.currencyCode} onChange={this.handleChange}>
              {this.currencyData.map(myOption => <MenuItem value={myOption['currency']}>{myOption['currency']}, {myOption['country']}</MenuItem>)}
            </Select>
            <Button className={'form-field'} onClick={this.currencyIsPresent} variant="contained" color="primary">
              Get Rate
            </Button>
            <Button className={'form-field refresh-temp'} onClick={this.handleRefresh} variant="contained" color="secondary">
              Refresh
            </Button>
            {/*<button>Submit</button>*/}
            {/*<button onClick={this.handleRefresh}>Refresh</button>*/}
            <br/>
          </form>
          {/*<input type='text' value={this.state.currencyCode} onChange={this.handleChange}/>*/}
          <table className='data-table'>
            <tr>
              <th className='secondary-cols'>Currency</th>
              <th className={'primary-cols'} colSpan={2}>Buy</th>
              <th className={'primary-cols'} colSpan={2}>Sell</th>
              <th className='secondary-cols'>Change</th>
            </tr>
            <tr>
              <th className={'secondary-children'}></th>
              <th className={'primary-children'}>Old</th>
              <th className={'primary-children'}>New</th>
              <th className={'primary-children'}>Old</th>
              <th className={'primary-children'}>New</th>
              <th className={'secondary-children'}></th>
            </tr>
            {this.state.dataMap}
          </table>

          <br/>
          <br/>
          <div className={'footer-time'}>
            <h4>Updated {this.recentUpdateTime}</h4>
          </div>
        </div>
    );
  }
}
// {this.state.allData[0]['time']['updated'] === '' ? '' : this.state.allData[this.state.allData.length - 1]['time']['updated']}
export default CurrencyManager;