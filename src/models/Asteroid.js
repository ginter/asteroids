import { degToRad } from '../helpers/degToRad.js';

const DEFAULT_SIZE = 100;
const MIN_SIZE = 8;

export default class Asteroid {
  constructor(placement, size=Math.max(DEFAULT_SIZE*Math.random(), MIN_SIZE)) {
    this.id = Math.random();
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
    this.size = size;
    this.width = size;
    this.height = size;
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
    return new Asteroid(newPlacement, this.size);
  }

  split() {
    if (this.size <= MIN_SIZE) return [];
    return [
      new Asteroid({
        x: this.x,
        y: this.y,
        speed: this.speed,
        direction: this.direction - 45
      }, this.size / 2),
      new Asteroid({
        x: this.x,
        y: this.y,
        speed: this.speed,
        direction: this.direction + 45
      }, this.size / 2),
    ];
  }
}
