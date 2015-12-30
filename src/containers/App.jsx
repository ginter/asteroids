import React from 'react';
import ReactDOM from 'react-dom';
import Board from '../components/Board.jsx';
import { moveShipUp, moveShipRight, moveShipBottom, moveShipLeft } from '../actions';

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

export default class App extends React.Component {
  componentDidMount() {
    ReactDOM.findDOMNode(this.refs.board).focus();
  }

  render () {
    return <Board ref='board' contentEditable onKeyDown={this.handleKeyDown} style={styles}/>;
  }

  handleKeyDown(e) {
    const { dispatch } = this.props;

    switch(e.key) {
      case 'ArrowUp': dispatch(moveShipUp); break;
      case 'ArrowRight': dispatch(moveShipRight); break;
      case 'ArrowBottom': dispatch(moveShipBottom); break;
      case 'ArrowLeft': dispatch(moveShipLeft); break;
    }
  }
}
