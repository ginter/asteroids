import { degToRad } from '../helpers/degToRad.js'

export default class Asteroid {
  constructor(placement) {
    this.id = Math.random();
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
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
    return new Asteroid(newPlacement);
  }
}
