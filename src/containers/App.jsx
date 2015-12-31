import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { tick, keyDown, keyUp } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleKeyUp = this.handleKeyUp.bind(this);
    this.handleTick = this.handleTick.bind(this);
  }

  componentDidMount() {
    const el = ReactDOM.findDOMNode(this.refs.focus);
    el.addEventListener('blur', function(e) { setTimeout(() => this.focus(), 1) }, true);
    el.focus();

    window.requestAnimationFrame(this.handleTick);
  }

  render () {
    return(
      <div>
        <Board/>
        <input ref='focus' onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}/>
      </div>
    );
  }

  handleKeyDown(e) {
    const { dispatch } = this.props;
    dispatch(keyDown(e.key));
  }

  handleKeyUp(e) {
    const { dispatch } = this.props;
    dispatch(keyUp(e.key));
  }

  handleTick() {
    const { dispatch } = this.props;
    dispatch(tick());

    window.requestAnimationFrame(this.handleTick);
  }
}

export default connect(state => state)(App)
