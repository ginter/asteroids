import React from 'react';
import { connect } from 'react-redux';

const styles = {
  background: 'white',
  width: '20px',
  height: '20px',
  position: 'absolute',
};

class Ship extends React.Component {

  render() {
    styles.top = this.props.position.top;
    styles.right = this.props.position.right;
    styles.bottom = this.props.position.bottom;
    styles.left = this.props.position.left;

    return <div style={styles}></div>;
  }
}

export default connect(state => ({ position: state.ship.position }))(Ship)
