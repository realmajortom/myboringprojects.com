import React, { Component } from 'react';

class History extends Component {
  render() {
    return <div className='History'> {this.props.children} </div>;
  }
}

export default History;