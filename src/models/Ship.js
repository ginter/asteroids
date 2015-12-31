const defaultPlacement = { x: 0, y: 0, direction: 45, speed: 10 };

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
}

function degToRad(deg) {
  return deg*Math.PI/180;
}
