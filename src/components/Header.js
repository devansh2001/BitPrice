import React, {Component} from 'react'

class Header extends Component {

  render() {
    return (
        <div className='header-div'>
          <img className='bitcoin-img img-left' src='https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'/>
          <h1 className='head'>Bitcoin Exchange Rates</h1>
          <img className='bitcoin-img img-right' src='https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'/>
        </div>

    );
  }
}

export default Header;