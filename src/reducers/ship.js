import { TURN_SHIP_LEFT, TURN_SHIP_RIGHT, MOVE_SHIP_FORWARD, MOVE_SHIP_BACKWARD } from '../constants';
import Ship from '../models/Ship.js';

export default function ship(ship = new Ship(), action) {
  switch (action.type) {
    case MOVE_SHIP_FORWARD: return ship.moveForward(); break;
    case TURN_SHIP_RIGHT: return ship.turnRight(); break;
    default: return ship;
  }
}
