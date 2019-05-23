import React, {Component} from 'react'
import 'bootstrap/dist/css/bootstrap.css'

class Header extends Component {

  render() {
    return (
        <div className='row header-div '>
          <img className={'.float-left img-fluid bitcoin-img'} src='https://en.bitcoin.it/w/images/en/2/29/BC_Logo_.png'/>
          <h1 className='col-md-9  text-left head d-none d-md-block'>Bitcoin Exchange Rates</h1>
        </div>

    );
  }
}

export default Header;