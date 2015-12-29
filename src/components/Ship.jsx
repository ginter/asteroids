import React from 'react';

const styles = {
  background: 'white',
  width: '20px',
  height: '20px',
  position: 'absolute',
  top: '50%',
  left: '50%'
};

export default class Ship extends React.Component {
  render () {
    return <div style={styles}></div>;
  }
}
