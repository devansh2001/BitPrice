import React, {Component} from 'react'

class Footer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dateTime: this.props.time
    }
  }

  render() {
    console.log(this.state.dateTime);
    console.log('THISISIT');
    return (
        <div className={'footer-time'}>
          Updated : {this.state.dateTime}
        </div>
    );
  }
}

export default Footer;