/* eslint-disable */
sortClick = e => {
  const symbol = e.target.getAttribute('name')

  if (/[0-9]/.test(symbol)) {
    this.setState({
      display: this.state.display + symbol,
      lastOp: symbol
    });
  } else {
    switch (symbol) {
      case 'del':
        this.handleDel;
        break;
      case 'c':
        this.handleClear;
        break;
      case 'q':
        this.handleEq;
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        this.handleOp;
        break;
      case '.':
        this.handleDec;
        break;
      case 's':
        alert('SURPRISE');
        break;
      default:
        alert('shit broke');
    };
  }
}
