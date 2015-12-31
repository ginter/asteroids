import { TICK, KEY_DOWN, KEY_UP } from '../constants.js';

export function tick() {
  return { type: TICK }
}

export function keyDown(key) {
  return { type: KEY_DOWN, data: key }
}

export function keyUp(key) {
  return { type: KEY_UP, data: key }
}
