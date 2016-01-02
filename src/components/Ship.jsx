import React from 'react';
import { connect } from 'react-redux';

class Ship extends React.Component {
  styles() {
    const shipPlacement = this.props.board.shipPlacement();

    return {
      fontSize: `${shipPlacement.size}px`,
      color: 'white',
      width: '1px',
      height: '1px',
      position: 'absolute',
      top: shipPlacement.top,
      left: shipPlacement.left,
      transform: `rotate(${shipPlacement.direction}deg)`
    };
  }

  render() {
    return(
      <div style={this.styles()} contentEditable={false}>
        <span style={{ fontSize: '25px', position: 'relative', top: '-13px', right: '10px' }}>
          >
        </span>
      </div>
    );
  }
}

export default connect(state => ({ board: state.game.board }))(Ship)
