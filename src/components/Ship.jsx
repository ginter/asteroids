import React from 'react';
import { connect } from 'react-redux';

class Ship extends React.Component {
  styles() {
    const shipPlacement = this.props.board.shipPlacement();

    return {
      fontSize: '25px',
      color: 'white',
      width: '25px',
      height: '25px',
      position: 'absolute',
      top: shipPlacement.top,
      left: shipPlacement.left,
      transform: `rotate(${shipPlacement.direction}deg)`
    };
  }

  render() {
    return <div style={this.styles()} contentEditable={false}>></div>;
  }
}

export default connect(state => ({ board: state.game.board }))(Ship)
