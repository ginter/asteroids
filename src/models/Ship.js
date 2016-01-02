import { degToRad } from '../helpers/degToRad.js';

const defaultPlacement = { x: 0, y: 0, direction: 45, speed: 5 };
const defaultSize = 15;
const maxSpeed = 25;
const minSpeed = 1;

function wrap(coord, max) {
  coord = coord % max;
  if (coord < 0) coord = max + coord;

  return coord;
}

export default class Ship {
  constructor(placement = defaultPlacement) {
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
    this.size = defaultSize;
    this.width = defaultSize;
    this.height = defaultSize;
  }

  getPlacement() {
    return { x: this.x, y: this.y, direction: this.direction };
  }

  turningSpeed() {
    return Math.sqrt(this.speed);
  }

  moveForward(width, height) {
    const newPlacement = {
      x: wrap(this.x + this.speed*Math.cos(degToRad(this.direction)), width),
      y: wrap(this.y + this.speed*Math.sin(degToRad(this.direction)), height),
      speed: this.speed,
      direction: this.direction
    };
    return new Ship(newPlacement);
  }

  moveBackward(width, height) {
    const newPlacement = {
      x: wrap(this.x - this.speed*Math.cos(degToRad(this.direction)), width),
      y: wrap(this.y - this.speed*Math.sin(degToRad(this.direction)), height),
      speed: this.speed,
      direction: this.direction
    };
    return new Ship(newPlacement);
  }

  turnLeft() {
    const newPlacement = {
      x: this.x,
      y: this.y,
      speed: this.speed,
      direction: this.direction - this.turningSpeed()
    };
    return new Ship(newPlacement);
  }

  turnRight() {
    const newPlacement = {
      x: this.x,
      y: this.y,
      speed: this.speed,
      direction: this.direction + this.turningSpeed()
    };
    return new Ship(newPlacement);
  }

  increaseSpeed() {
    const newPlacement = {
      x: this.x,
      y: this.y,
      speed: Math.min(++this.speed, maxSpeed),
      direction: this.direction
    };
    return new Ship(newPlacement);
  }

  decreaseSpeed() {
    const newPlacement = {
      x: this.x,
      y: this.y,
      speed: Math.max(--this.speed, minSpeed),
      direction: this.direction
    };
    return new Ship(newPlacement);
  }
}
