import React from 'react';
import { connect } from 'react-redux';
import SpeedControl from './SpeedControl.jsx';
import Ship from './Ship.jsx';
import Asteroid from './Asteroid.jsx';
import Bullet from './Bullet.jsx';

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
      color: 'transparent',
      overflow: 'hidden'
    }
  }

  render() {
    return (
      <div style={this.styles()} {...this.props}>
        <SpeedControl/>
        <Ship/>
        {this.props.board.asteroids.map(a => <Asteroid key={a.id} asteroid={a}/>)}
        {this.props.board.bullets.map(b => <Bullet key={b.id} bullet={b}/>)}
        <a
          contentEditable={false}
          style={{ color: 'white', position: 'absolute', right: 0, bottom: 0 }}
          href='https://github.com/ginter/asteroids'
          target='_blank'>
          View on Github
        </a>
      </div>
    );
  }
}

export default connect(state => ({ board: state.game.board }))(Board)
