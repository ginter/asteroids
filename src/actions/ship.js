import { MOVE_SHIP_FORWARD, MOVE_SHIP_BACKWARD, TURN_SHIP_LEFT, TURN_SHIP_RIGHT } from '../constants.js';

export function moveShipForward() {
  return { type: MOVE_SHIP_FORWARD }
}

export function moveShipBackward() {
  return { type: MOVE_SHIP_BACKWARD }
}

export function turnShipLeft() {
  return { type: TURN_SHIP_LEFT }
}

export function turnShipRight() {
  return { type: TURN_SHIP_RIGHT }
}
