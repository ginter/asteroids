import React from 'react';
import { connect } from 'react-redux';
import { increaseShipSpeed, decreaseShipSpeed } from '../actions';

class Asteroid extends React.Component {
  styles() {
    const placement = this.props.board.asteroidPlacement(this.props.asteroid);

    return {
      width: '25px',
      height: '25px',
      border: '1px solid white',
      position: 'absolute',
      top: placement.top,
      left: placement.left,
      transform: `rotate(${placement.direction}deg)`
    };
  }

  render() {
    return <div style={this.styles()}></div>;
  }
}

export default connect(state => ({ board: state.game.board }))(Asteroid)
