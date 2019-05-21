import React, {Component} from 'react'

class RequestHandler extends Component {
  constructor(props) {
    super(props);
  }

  handleRequest = () => {
    let mainURL = 'https://api.coindesk.com/v1/bpi/currentprice/';
    let jsonWord = '.json';
    let userCurrency = 'INR';
    let endpoint = mainURL + userCurrency + jsonWord;
    console.log(endpoint);
    fetch(endpoint)
        .then(response => response.json())
        .then(data => console.log(data));
  };

  render() {
    return (
        <div>
          <form onSubmit={this.handleRequest}>
            <button>Submit</button>
          </form>
        </div>
    );
  }

}

export default RequestHandler;