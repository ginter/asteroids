import React from 'react';
import Ship from './Ship.jsx';

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

export default class Board extends React.Component {
  render () {
    return (
      <div style={styles}>
        <Ship/>
      </div>
    );
  }
}
