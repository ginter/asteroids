import { TURN_SHIP_LEFT, TURN_SHIP_RIGHT, MOVE_SHIP_FORWARD, MOVE_SHIP_BACKWARD } from '../constants';

export default function ship(state = { position: { top: 0, right: 0, bottom: 0, left: 0 } }, action) {
  switch (action.type) {

  case MOVE_SHIP_FORWARD:
    return state.set({
      position: {
        top: action.data.top,
        right: action.data.right,
        bottom: action.data.bottom,
        left: action.data.left
      }
    });

  default:
    return state;
  }
}
