import Ship from './Ship.js';

function wrap(coord, max) {
  coord = coord % max;
  if (coord < 0) coord = max + coord;

  return coord;
}

export default class Board {
  constructor(width=window.innerWidth, height=window.innerHeight, ship=new Ship()) {
    this.width = width;
    this.height = height;
    this.ship = ship;
  }

  shipPlacement() {
    let { x, y, direction } = this.ship.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  shipSpeed() {
    return this.ship.speed;
  }

  moveShipForward() {
    return new Board(this.width, this.height, this.ship.moveForward())
  }

  moveShipBackward() {
    return new Board(this.width, this.height, this.ship.moveBackward())
  }

  turnShipLeft() {
    return new Board(this.width, this.height, this.ship.turnLeft())
  }

  turnShipRight() {
    return new Board(this.width, this.height, this.ship.turnRight())
  }

  increaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.increaseSpeed())
  }

  decreaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.decreaseSpeed())
  }
}
