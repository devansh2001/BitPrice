import React, {Component} from 'react'
import Currency from './Currency.js'

class CurrencyManager extends Component {
  constructor(props) {
    super(props);
    this.requestedCurrencies = [];
    this.state = {
      currencyCode: '',
      allData: [],
      dataMap: [],
      refreshRequested: false
    };
    this.recentUpdateTime = this.state.allData[0] ? this.state.allData['time']['updated'] : '';
  }

  //
  // cb = (dataFromChild) => {
  //   console.log(dataFromChild);
  // };

  handleRequest =  async (code = this.state.currencyCode) => {
    console.log(this.requestedCurrencies);
    let mainURL = 'https://api.coindesk.com/v1/bpi/currentprice/';
    let jsonWord = '.json';
    let endpoint = mainURL + code + jsonWord;
    let currData = {};
    await fetch(endpoint)
        .then(response => response.json())
        .then(data => {currData = data; this.setState(prevState => ({
            allData: [...prevState.allData, data]
          }))}
        ).catch(e => console.log(e));
    //this.props.cb(this.state.receivedData);
    this.recentUpdateTime = this.state.allData[0] ? this.state.allData[0]['time']['updated'] : '';
    console.log(currData);
    console.log('Yeah! I got this')
    await this.setState(prevState => ({
      dataMap: [...prevState.dataMap,
            <tr>
              <td>{code}</td>
              <td>{currData['bpi'][code]['rate']}</td>
            </tr>
      ]
      //dataMap: this.state.allData.map(conversion => <li>{conversion['bpi'][this.state.currencyCode]['rate']}</li>)
    }));
    console.log(this.state.allData);
    this.setState({
      currencyCode: ''
    })
  };

  currencyIsPresent = async () => {
    if (this.requestedCurrencies.some(item => item === this.state.currencyCode)) {
      console.log('TRUE');
    } else {
      console.log('FALSE');
      await this.requestedCurrencies.push(this.state.currencyCode);
      await this.handleRequest();
    }
  };

  handleChange = (event) => {
    this.setState({
      currencyCode: event.target.value.toUpperCase()
    })
  };

  // handleRefresh2 = () => {
  //   this.setState(prevState => ({
  //     refreshRequested: !prevState.refreshRequested
  //   }));
  // };

  handleRefresh = async () => {
    await this.setState({
      dataMap: [],
      allData: []
    });
    await console.log('Set state');
    for (let i = 0; i < this.requestedCurrencies.length; i++) {
      await this.handleRequest(this.requestedCurrencies[i]);
    }
    await console.log('Handled Requests');
  };

  // handleRefresh = async () => {
  //   let mainURL = 'https://api.coindesk.com/v1/bpi/currentprice/';
  //   let jsonWord = '.json';
  //   this.setState({
  //     dataMap: []
  //   })
  //   for (let val in this.state.allData) {
  //
  //   }
  // };

  render() {
    console.log('Rendering');
    return (
        <div>
          <input type='text' value={this.state.currencyCode} onChange={this.handleChange}/>
          <button onClick={this.currencyIsPresent}>Submit</button>
          <button onClick={this.handleRefresh}>Refresh</button>
          <h1>Rendering all the data below</h1>
          <table>
            <tr>
              <th>Currency</th>
              <th>Rate</th>
            </tr>
            {this.state.dataMap}
          </table>
          <h4>Updated {this.recentUpdateTime}</h4>
        </div>
    );
  }
}
// {this.state.allData[0]['time']['updated'] === '' ? '' : this.state.allData[this.state.allData.length - 1]['time']['updated']}
export default CurrencyManager;