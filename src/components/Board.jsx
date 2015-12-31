import React from 'react';
import { connect } from 'react-redux';
import Ship from './Ship.jsx';
import SpeedControl from './SpeedControl.jsx';

export default class Board extends React.Component {
  styles() {
    return {
      width: `${this.props.board.width}px`,
      height: `${this.props.board.height}px`,
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
      background: 'black',
      color: 'transparent'
    }
  }

  render() {
    return (
      <div style={this.styles()} {...this.props}>
        <Ship />
        <SpeedControl/>
      </div>
    );
  }
}

export default connect(state => ({ board: state.game.board }))(Board)
