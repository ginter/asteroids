import { degToRad } from '../helpers/degToRad.js';

const defaultPlacement = { x: 0, y: 0, direction: 45, speed: 5 };
const maxSpeed = 25;
const minSpeed = 1;

export default class Ship {
  constructor(placement = defaultPlacement) {
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
  }

  getPlacement() {
    return { x: this.x, y: this.y, direction: this.direction };
  }

  turningSpeed() {
    return Math.sqrt(this.speed);
  }

  moveForward() {
    const newPlacement = {
      x: this.x + this.speed*Math.cos(degToRad(this.direction)),
      y: this.y + this.speed*Math.sin(degToRad(this.direction)),
      speed: this.speed,
      direction: this.direction
    };
    return new Ship(newPlacement);
  }

  moveBackward() {
    const newPlacement = {
      x: this.x - this.speed*Math.cos(degToRad(this.direction)),
      y: this.y - this.speed*Math.sin(degToRad(this.direction)),
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
