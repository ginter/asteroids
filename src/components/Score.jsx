import React from 'react';
import { connect } from 'react-redux';

class Score extends React.Component {
  styles() {
    return {
      fontSize: '25px',
      color: 'white',
      textAlign: 'center',
      position: 'absolute',
      top: '5px',
      left: '5px'
    };
  }

  render() {
    return(
      <div style={this.styles()} contentEditable={false}>
        <p style={{ margin: 0 }}>Score ({this.props.game.score()})</p>
      </div>
    );
  }
}

export default connect(state => ({ game: state.game }))(Score)
