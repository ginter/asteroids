import Board from './Board.js';

const SPACE_BAR = 32;
const ARROW_LEFT = 37;
const ARROW_UP = 38;
const ARROW_RIGHT = 39;
const ARROW_DOWN = 40;
const FIRING_DELAY = 350;

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

  increaseShipSpeed() {
    return new Game(this.board.increaseShipSpeed(), this.pressedKeys);
  }

  decreaseShipSpeed() {
    return new Game(this.board.decreaseShipSpeed(), this.pressedKeys);
  }

  updateBoard() {
    let board = this.board;

    if (this.pressedKeys[SPACE_BAR] && this.isAbleToFire()) board = board.fireBullet();
    if (this.pressedKeys[ARROW_RIGHT]) board = board.turnShipRight();
    if (this.pressedKeys[ARROW_LEFT]) board = board.turnShipLeft();
    if (this.pressedKeys[ARROW_UP]) board = board.moveShipForward();
    if (this.pressedKeys[ARROW_DOWN]) board = board.moveShipBackward();
    if (this.isGameOver()) board = new Board();

    return board.
      handleCollisions().
      spawnAsteroids().
      moveAsteroidsForward().
      moveBulletsForward();
  }

  isAbleToFire() {
    let bullets = this.board.bullets;

    if (!bullets.length) return true;
    return bullets[bullets.length-1].timestamp <= Date.now() - FIRING_DELAY;
  }

  isGameOver() {
    return this.board.asteroids.some((a) => this.board.hasCollided(this.board.ship, a));
  }
}
