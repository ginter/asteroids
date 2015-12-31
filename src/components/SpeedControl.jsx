import React from 'react';
import { connect } from 'react-redux';
import { increaseShipSpeed, decreaseShipSpeed } from '../actions';

class SpeedControl extends React.Component {
  constructor(props) {
    super(props);

    this.handleIncreaseClick = this.handleIncreaseClick.bind(this);
    this.handleDecreaseClick = this.handleDecreaseClick.bind(this);
  }

  styles() {
    const shipPlacement = this.props.board.shipPlacement();

    return {
      fontSize: '25px',
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      top: '5px',
      right: '5px'
    };
  }

  render() {
    return(
      <div style={this.styles()} contentEditable={false}>
        <p style={{ margin: 0 }}>Speed ({this.props.board.shipSpeed()})</p>
        <a
          style={{ color: 'white', textDecoration: 'none' }}
          href=''
          onClick={this.handleIncreaseClick}>+</a>
        <br/>
        <a
          style={{ color: 'white', textDecoration: 'none' }}
          href=''
          onClick={this.handleDecreaseClick}>-</a>
      </div>
    );
  }

  handleIncreaseClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(increaseShipSpeed());
  }

  handleDecreaseClick(e) {
    e.preventDefault();

    const { dispatch } = this.props;
    dispatch(decreaseShipSpeed());
  }
}

export default connect(state => ({ board: state.game.board }))(SpeedControl)
