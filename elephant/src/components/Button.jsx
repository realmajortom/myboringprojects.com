import React, { Component } from 'react';

class Button extends Component {
  render() {
    return (
      <div className={`Button ${this.props.className}`} onClick={this.props.onClick} name={this.props.name} >
        {this.props.label}
      </div>
    );
  }
}

export default Button;