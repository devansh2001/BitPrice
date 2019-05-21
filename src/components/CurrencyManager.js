import React, {Component} from 'react'
import Currency from './Currency.js'

class CurrencyManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currencyCode: '',
      allData: [],
      dataMap: []
    }
  }

  //
  // cb = (dataFromChild) => {
  //   console.log(dataFromChild);
  // };

  handleRequest =  async () => {
    let mainURL = 'https://api.coindesk.com/v1/bpi/currentprice/';
    let jsonWord = '.json';
    let endpoint = mainURL + this.state.currencyCode + jsonWord;
    let currData = {};
    await fetch(endpoint)
        .then(response => response.json())
        .then(data => {currData = data; this.setState(prevState => ({
            allData: [...prevState.allData, data]
          }))}
        ).catch(e => console.log(e));
    //this.props.cb(this.state.receivedData);
    console.log(currData);
    console.log('Yeah! I got this')
    await this.setState(prevState => ({
      dataMap: [...prevState.dataMap,
            <tr>
              <td>{this.state.currencyCode}</td>
              <td>{currData['bpi'][this.state.currencyCode]['rate']}</td>
            </tr>
      ]
      //dataMap: this.state.allData.map(conversion => <li>{conversion['bpi'][this.state.currencyCode]['rate']}</li>)
    }));
    console.log(this.state.allData);
  };

  handleChange = (event) => {
    this.setState({
      currencyCode: event.target.value.toUpperCase()
    })
  };

  handleSubmit = () => {
    const data = <Currency to={this.state.currencyCode} />;
    this.setState(previousState => ({
      allData: [...previousState.allData, data]
    }))
  };

  myFunction = () => {
    return 5
  };
  render() {
    return (
        <div>
          <input type='text' value={this.state.currencyCode} onChange={this.handleChange}/>
          <button onClick={this.handleRequest}>Submit</button>
          <h1>Rendering all the data below</h1>
          <table>
            {this.state.dataMap}
          </table>
        </div>
    );
  }
}

export default CurrencyManager;