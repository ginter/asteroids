import { TICK, KEY_DOWN, KEY_UP } from '../constants';
import Game from '../models/Game.js';

export default function game(game=new Game(), action) {
  switch (action.type) {
    case TICK: return game.tick(); break;
    case KEY_DOWN: return game.pressKey(action.data); break;
    case KEY_UP: return game.releaseKey(action.data); break;
    default: return game;
  }
}
