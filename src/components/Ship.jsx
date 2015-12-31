import React from 'react';
import { connect } from 'react-redux';

class Ship extends React.Component {
  styles() {
    const shipPlacement = this.props.board.shipPlacement();

    return {
      background: 'white',
      width: '20px',
      height: '20px',
      position: 'absolute',
      top: shipPlacement.top,
      left: shipPlacement.left,
      transform: `rotate(${shipPlacement.direction}deg)`
    };

  }

  render() {
    return <div style={this.styles()}></div>;
  }
}

export default connect(state => ({ board: state.game.board }))(Ship)
