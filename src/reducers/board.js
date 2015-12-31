import { TURN_SHIP_LEFT, TURN_SHIP_RIGHT, MOVE_SHIP_FORWARD, MOVE_SHIP_BACKWARD } from '../constants';
import Board from '../models/Board.js';

export default function board(board = new Board(), action) {
  switch (action.type) {
    case MOVE_SHIP_FORWARD: return board.moveShipForward(); break;
    case MOVE_SHIP_BACKWARD: return board.moveShipBackward(); break;
    case TURN_SHIP_RIGHT: return board.turnShipRight(); break;
    case TURN_SHIP_LEFT: return board.turnShipLeft(); break;
    default: return board;
  }
}
