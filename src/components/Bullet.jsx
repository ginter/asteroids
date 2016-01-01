import React from 'react';
import { connect } from 'react-redux';
import { increaseShipSpeed, decreaseShipSpeed } from '../actions';

class Bullet extends React.Component {
  styles() {
    const placement = this.props.board.bulletPlacement(this.props.bullet);

    return {
      width: `${this.props.bullet.size}px`,
      height: `${this.props.bullet.size}px`,
      backgroundColor: 'white',
      borderRadius: '50%',
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

export default connect(state => ({ board: state.game.board }))(Bullet)
