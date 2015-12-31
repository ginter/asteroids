import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { moveShipForward, moveShipBackward, turnShipRight, turnShipLeft } from '../actions';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.board).focus();
  }

  render () {
    return <Board ref='board' contentEditable onKeyDown={this.handleKeyDown}/>;
  }

  handleKeyDown(e) {
    const { dispatch } = this.props;

    switch(e.key) {
      case 'ArrowUp': dispatch(moveShipForward()); break;
      case 'ArrowDown': dispatch(moveShipBackward()); break;
      case 'ArrowRight': dispatch(turnShipRight()); break;
      case 'ArrowLeft': dispatch(turnShipLeft()); break;
    }
  }
}

export default connect(state => state)(App)
