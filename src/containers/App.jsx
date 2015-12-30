import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import Board from '../components/Board.jsx';
import { moveShipForward, moveShipBackward, turnShipRight, turnShipLeft } from '../actions';

const styles = {
  width: '100%',
  height: '100%',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: 'black'
};

class App extends React.Component {
  constructor(props) {
    super(props);

    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.board).focus();
  }

  render () {
    return <Board ref='board' contentEditable onKeyDown={this.handleKeyDown} style={styles}/>;
  }

  handleKeyDown(e) {
    const { dispatch } = this.props;

    switch(e.key) {
      case 'ArrowUp': dispatch(moveShipForward()); break;
      case 'ArrowBottom': dispatch(moveShipBackward()); break;
      case 'ArrowRight': dispatch(turnShipRight()); break;
      case 'ArrowLeft': dispatch(turnShipLeft()); break;
    }
  }
}

export default connect(state => state)(App)
