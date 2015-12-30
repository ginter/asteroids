import React from 'react';
import { connect } from 'react-redux';

class Ship extends React.Component {
  styles() {
    return {
      background: 'white',
      width: '20px',
      height: '20px',
      position: 'absolute',
      top: this.props.ship.y,
      left: this.props.ship.x,
      transform: `rotate(${this.props.ship.direction}deg)`
    };

  }

  render() {
    return <div style={this.styles()}></div>;
  }
}

export default connect(state => ({ ship: state.ship }))(Ship)
