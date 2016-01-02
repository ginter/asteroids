import { degToRad } from '../helpers/degToRad.js';

const DEFAULT_SIZE = 3;

export default class Bullet {
  constructor(placement, timestamp=Date.now()) {
    this.id = Math.random();
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
    this.timestamp = timestamp;
    this.size = DEFAULT_SIZE;
    this.width = DEFAULT_SIZE;
    this.height = DEFAULT_SIZE;
  }

  getPlacement() {
    return { x: this.x, y: this.y, direction: this.direction };
  }

  moveForward() {
    const newPlacement = {
      x: this.x + this.speed*Math.cos(degToRad(this.direction)),
      y: this.y + this.speed*Math.sin(degToRad(this.direction)),
      speed: this.speed,
      direction: this.direction
    };
    return new Bullet(newPlacement, this.timestamp);
  }
}
