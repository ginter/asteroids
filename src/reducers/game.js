import { TICK, KEY_DOWN, KEY_UP, INCREASE_SHIP_SPEED, DECREASE_SHIP_SPEED } from '../constants';
import Game from '../models/Game.js';

export default function game(game=new Game(), action) {
  switch (action.type) {
    case TICK: return game.tick(); break;
    case KEY_DOWN: return game.pressKey(action.data); break;
    case KEY_UP: return game.releaseKey(action.data); break;
    case INCREASE_SHIP_SPEED: return game.increaseShipSpeed(); break;
    case DECREASE_SHIP_SPEED: return game.decreaseShipSpeed(); break;
    default: return game;
  }
}
