import React, {Component} from 'react'


class Currency extends Component {
  constructor(props) {
    super(props);
    this.state = {
      from: this.props.from || 'BTC',
      to: this.props.to || 'USD',
      receivedData: []
    };
  }


  render() {
    return (
        <div>
          <hr/>
          <h1>{this.state.from}</h1> TO <h1> {this.state.to} </h1>
          <hr/>
        </div>
    );
  }
}

export default Currency;