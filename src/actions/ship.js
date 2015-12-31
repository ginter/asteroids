import { MOVE_SHIP_FORWARD, MOVE_SHIP_BACKWARD, TURN_SHIP_LEFT, TURN_SHIP_RIGHT, INCREASE_SHIP_SPEED, DECREASE_SHIP_SPEED } from '../constants.js';

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

export function increaseShipSpeed() {
  return { type: INCREASE_SHIP_SPEED }
}

export function decreaseShipSpeed() {
  return { type: DECREASE_SHIP_SPEED }
}
