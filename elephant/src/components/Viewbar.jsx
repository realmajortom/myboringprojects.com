import React, { Component } from 'react';

class Viewbar extends Component {
  render() {
    return <div className='Viewbar' > {this.props.display} </div>;
  }
}

export default Viewbar;