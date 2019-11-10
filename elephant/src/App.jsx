import React from 'react';
import './App.css';
import Viewbar from './components/Viewbar';
import Keypad from './components/Keypad';
import Button from './components/Button';
import History from './components/History'

class Calc extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fullInput: '',
      cQuence: '',
      decCount: 0,
      num1Hist: [],
      opHist: [],
      num2Hist: [],
      resultHist: []
    }
    this.sortClick = this.sortClick.bind(this);
    this.handleClear = this.handleClear.bind(this);
    this.handleDec = this.handleDec.bind(this);
    this.handleDel = this.handleDel.bind(this);
    this.handleOp = this.handleOp.bind(this);
    this.handleEq = this.handleEq.bind(this);
  }

  sortClick = e => {
    const symbol = e.target.getAttribute('name');
    if (/[0-9]/.test(symbol)) {
      if (this.state.cQuence === 'c') {
        this.setState({
          cQuence: 'Num'
        })
      }
      this.setState({
        fullInput: this.state.fullInput + symbol
      });
    } else {
      switch (symbol) {
        case 'del':
          this.handleDel(symbol);
          break;
        case 'c':
          this.handleClear();
          break;
        case 'q':
          this.handleEq();
          break;
        case '+':
        case '-':
        case 'x':
        case '/':
          this.handleOp(symbol);
          break;
        case '.':
          this.handleDec();
          break;
        case 's':
          alert('Gotcha!');
          break;
        default:
          alert('sorry, it appears that something broke.');
      };
    }
  }
  handleDel = () => {
    if (this.state.fullInput[this.state.fullInput.length - 1] === '.') {
      this.setState({
        decCount: this.state.decCount - 1,
        fullInput: this.state.fullInput.slice(0, -1),
        cQuence: 'del'
      });
    } else if (this.state.fullInput[this.state.fullInput.length - 1] === ' ') {
      this.setState({
        fullInput: this.state.fullInput.slice(0, -3),
        cQuence: 'del'
      });
    } else {
      this.setState({
        fullInput: this.state.fullInput.slice(0, -1),
        cQuence: 'del'
      });
    }
  }
  handleClear = () => {
    if (this.state.cQuence === 'c') {
      if (window.confirm('This will erase all history. Are you sure?')) {
        this.setState({
          fullInput: '',
          cQuence: '',
          decCount: 0,
          num1Hist: [],
          opHist: [],
          num2Hist: [],
          resultHist: []
        });
      }
    } else {
      this.setState({
        fullInput: '',
        cQuence: 'c',
        decCount: 0
      });
    }
  }
  handleDec() {
    if (this.state.fullInput.indexOf('.') === -1) {
      this.setState({
        fullInput: this.state.fullInput + '.',
        cQuence: '.',
        decCount: 1
      });
    } else if ((this.state.fullInput.indexOf('.') < this.state.fullInput.indexOf(this.state.cQuence)) && this.state.decCount === 1) {
      this.setState({
        fullInput: this.state.fullInput + '.',
        cQuence: '.',
        decCount: 2
      });
    }
  }
  handleOp(symbol) {
    if (!/x|-|\/|\+/g.test(this.state.fullInput)) {
      this.setState({
        fullInput: this.state.fullInput + ' ' + symbol + ' ',
        cQuence: symbol
      });
    }
  };

  handleEq = () => {
    const oppyFunc = {
      '+': (x, y) => x + y,
      '-': (x, y) => x - y,
      'x': (x, y) => x * y,
      '/': (x, y) => x / y
    };
    const playPut = this.state.fullInput
    const symDex = playPut.search(/-|\+|x|\//);
    const thisOp = playPut.charAt(symDex);
    const num1 = parseFloat(playPut.slice(0, (symDex - 1)));
    const num2 = parseFloat(playPut.slice((symDex + 2)));
    const result = [num1, num2].reduce(oppyFunc[thisOp]);

    this.setState({
      fullInput: `${result}`,
      cQuence: '',
      decCount: 0,
      num1Hist: [num1, ...this.state.num1Hist],
      opHist: [thisOp, ...this.state.opHist],
      num2Hist: [num2, ...this.state.num2Hist],
      resultHist: [result, ...this.state.resultHist]
    });
  };

  handleKeyDown(e) {
    if (e.ctrlKey && e.key === 'z') {
      this.handleClear();
    } else if (e.shiftKey && e.key === '+') {
      if (!/x|-|\/|\+/g.test(this.state.fullInput)) {
        this.setState({
          fullInput: this.state.fullInput + ' ' + e.key + ' ',
          cQuence: '+'
        });
      }
    } else {
      switch (e.key) {
        case '=':
        case 'Enter':
          this.handleEq();
          break;
        case 'Backspace':
          this.handleDel();
          break;
        case '0':
        case '1':
        case '2':
        case '3':
        case '4':
        case '5':
        case '6':
        case '7':
        case '8':
        case '9':
          if (this.state.cQuence === 'c') {
            this.setState({
              cQuence: 'Num'
            })
          }
          this.setState({
            fullInput: this.state.fullInput + e.key
          });
          break;
        case '-':
        case 'x':
        case '/':
          if (!/x|-|\/|\+/g.test(this.state.fullInput)) {
            this.setState({
              fullInput: this.state.fullInput + ' ' + e.key + ' ',
              cQuence: e.key
            });
          }
          break;
        case '.':
          this.handleDec();
          break;
        default:
          break;
      }
    }
  }

  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
  }

  render() {
    return (
      <div className='Calc' >
        <h1>Elephant</h1>
        <Viewbar display={this.state.fullInput} />
        <div className='KeyHistCont'>
          <Keypad>
            <div className='Row'>
              <Button name='c' label='c' className='Command' onClick={this.sortClick} />
              <Button name='del' label='del' className='Command' onClick={this.sortClick} />
              <Button name='q' label="=" className='Command' onClick={this.sortClick} />
            </div>

            <div className='Row'>
              <Button name='7' label='7' className='Num' onClick={this.sortClick} />
              <Button name='8' label='8' className='Num' onClick={this.sortClick} />
              <Button name='9' label='9' className='Num' onClick={this.sortClick} />
              <Button name='x' label='x' className='Op' onClick={this.sortClick} />
            </div>

            <div className='Row'>
              <Button name='4' label='4' className='Num' onClick={this.sortClick} />
              <Button name='5' label='5' className='Num' onClick={this.sortClick} />
              <Button name='6' label='6' className='Num' onClick={this.sortClick} />
              <Button name='/' label='&#247;' className='Op' onClick={this.sortClick} />
            </div>

            <div className='Row'>
              <Button name='1' label='1' className='Num' onClick={this.sortClick} />
              <Button name='2' label='2' className='Num' onClick={this.sortClick} />
              <Button name='3' label='3' className='Num' onClick={this.sortClick} />
              <Button name='+' label='+' className='Op' onClick={this.sortClick} />
            </div>

            <div className='Row'>
              <Button name='s' label='😶' className='Num' onClick={this.sortClick} />
              <Button name='0' label='0' className='Num' onClick={this.sortClick} />
              <Button name='.' label='.' className='Num' onClick={this.sortClick} />
              <Button name='-' label='-' className='Op' onClick={this.sortClick} />
            </div>
          </Keypad>
          <History>
            <span> {this.state.num1Hist[0]} {this.state.opHist[0]} {this.state.num2Hist[0]} {this.state.resultHist[0] != null ? ' = ' : ''} {this.state.resultHist[0]} </span>
            <span> {this.state.num1Hist[1]} {this.state.opHist[1]} {this.state.num2Hist[1]} {this.state.resultHist[1] != null ? ' = ' : ''}{this.state.resultHist[1]} </span>
            <span> {this.state.num1Hist[2]} {this.state.opHist[2]} {this.state.num2Hist[2]} {this.state.resultHist[2] != null ? ' = ' : ''}{this.state.resultHist[2]} </span>
            <span> {this.state.num1Hist[3]} {this.state.opHist[3]} {this.state.num2Hist[3]} {this.state.resultHist[3] != null ? ' = ' : ''}{this.state.resultHist[3]} </span>
            <span> {this.state.num1Hist[4]} {this.state.opHist[4]} {this.state.num2Hist[4]} {this.state.resultHist[4] != null ? ' = ' : ''}{this.state.resultHist[4]} </span>
            <span> {this.state.num1Hist[5]} {this.state.opHist[5]} {this.state.num2Hist[5]} {this.state.resultHist[5] != null ? ' = ' : ''}{this.state.resultHist[5]} </span>
            <span> {this.state.num1Hist[6]} {this.state.opHist[6]} {this.state.num2Hist[6]} {this.state.resultHist[6] != null ? ' = ' : ''}{this.state.resultHist[6]} </span>
            <span> {this.state.num1Hist[7]} {this.state.opHist[7]} {this.state.num2Hist[7]} {this.state.resultHist[7] != null ? ' = ' : ''}{this.state.resultHist[7]} </span>
            <span> {this.state.num1Hist[8]} {this.state.opHist[8]} {this.state.num2Hist[8]} {this.state.resultHist[8] != null ? ' = ' : ''}{this.state.resultHist[8]} </span>
            <span> {this.state.num1Hist[9]} {this.state.opHist[9]} {this.state.num2Hist[9]} {this.state.resultHist[9] != null ? ' = ' : ''}{this.state.resultHist[9]} </span>
          </History>
        </div>
      </div>
    );
  }
}

export default Calc;
