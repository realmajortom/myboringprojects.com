/* eslint-disable */
sortClick = e => {
  const symbol = e.target.getAttribute('name');

  if (symbol === 'c') {
    
  }
  else if (symbol === 'del') {

  }
  else if (symbol === 'q') {
    this.equalFunc(symbol);
  }
  else if (/[0-9]/.test(symbol)) {
    this.setState({
      display: this.state.display + symbol,
      lastOp: symbol
    });
  }
  else if (symbol === '.') {

  } else if (symbol !== this.state.lastOp) {
    switch (symbol) {
      case '+':
      case '-':
      case 'x':
      case '/':
        this.addOp(symbol);
        break;
      case 's':
        alert('SURPRISE');
        break;
      default:
        alert('symbol switch broke');
    }
  };
}