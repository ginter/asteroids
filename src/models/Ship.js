const defaultPlacement = { x: 0, y: 0, direction: 45, speed: 10 };

export default class Ship {
  constructor(placement = defaultPlacement) {
    this.x = placement.x;
    this.y = placement.y;
    this.speed = placement.speed;
    this.direction = placement.direction;
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
}

function degToRad(deg) {
  return deg*Math.PI/180;
}

/*
Move forward
0  0, 0
1  0, 0

0  0, 90
0 -1, 90

0  0, 180
-1 0, 180

0  0, 270
0  1, 270
*/
