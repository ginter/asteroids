import Board from './Board.js';

export default class Game {
  constructor(board=new Board(), pressedKeys={}) {
    this.board = board;
    this.pressedKeys = pressedKeys;
  }

  tick() {
    return new Game(this.updateBoard(), this.pressedKeys)
  }

  pressKey(key) {
    let pressedKeys = this.pressedKeys;
    pressedKeys[key] = true;

    return new Game(this.board, pressedKeys);
  }

  releaseKey(key) {
    let pressedKeys = this.pressedKeys;
    pressedKeys[key] = false;

    return new Game(this.board, pressedKeys);
  }

  updateBoard() {
    let board = this.board;

    if (this.pressedKeys['ArrowRight']) board = board.turnShipRight();
    if (this.pressedKeys['ArrowLeft']) board = board.turnShipLeft();
    if (this.pressedKeys['ArrowUp']) board = board.moveShipForward();
    if (this.pressedKeys['ArrowDown']) board = board.moveShipBackward();

    return board;
  }
}
