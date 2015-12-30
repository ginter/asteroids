import React from 'react';
import { connect } from 'react-redux';
import Ship from './Ship.jsx';

export default class Board extends React.Component {
  render() {
    return (
      <div {...this.props}>
        <Ship />
      </div>
    );
  }
}
