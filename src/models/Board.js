import Ship from './Ship.js';
import Asteroid from './Asteroid.js';
import Bullet from './Bullet.js';

const MAX_ASTEROID_COUNT = 10;

function wrap(coord, max) {
  coord = coord % max;
  if (coord < 0) coord = max + coord;

  return coord;
}

export default class Board {
  constructor(width=window.innerWidth, height=window.innerHeight, ship=new Ship(), asteroids=[], bullets=[]){
    this.width = width;
    this.height = height;
    this.ship = ship;
    this.asteroids = asteroids;
    this.bullets = bullets;
  }

  shipPlacement() {
    let { x, y, direction } = this.ship.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  shipSpeed() {
    return this.ship.speed;
  }

  moveShipForward() {
    return new Board(this.width, this.height, this.ship.moveForward(), this.asteroids, this.bullets);
  }

  moveShipBackward() {
    return new Board(this.width, this.height, this.ship.moveBackward(), this.asteroids, this.bullets);
  }

  turnShipLeft() {
    return new Board(this.width, this.height, this.ship.turnLeft(), this.asteroids, this.bullets);
  }

  turnShipRight() {
    return new Board(this.width, this.height, this.ship.turnRight(), this.asteroids, this.bullets);
  }

  increaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.increaseSpeed(), this.asteroids, this.bullets);
  }

  decreaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.decreaseSpeed(), this.asteroids, this.bullets);
  }

  hasMaxAsteroids() {
    return this.asteroids.length >= MAX_ASTEROID_COUNT;
  }

  asteroidPlacement(asteroid) {
    let { x, y, direction } = asteroid.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  spawnAsteroids() {
    if (this.hasMaxAsteroids()) return this;

    let asteroid = new Asteroid({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      direction: Math.random() * 360,
      speed: Math.random()
    });

    return new Board(this.width, this.height, this.ship, this.asteroids.concat([asteroid]), this.bullets);
  }

  moveAsteroidsForward() {
    const asteroids = this.asteroids.map(a => a.moveForward());
    return new Board(this.width, this.height, this.ship, asteroids, this.bullets);
  }

  bulletPlacement(bullet) {
    let { x, y, direction } = bullet.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  fireBullet() {
    let bullet = new Bullet({
      x: this.ship.x,
      y: this.ship.y,
      direction: this.ship.direction,
      speed: this.ship.speed*1.5
    });

    return new Board(this.width, this.height, this.ship, this.asteroids, this.bullets.concat([bullet]));
  }

  moveBulletsForward() {
    const bullets = this.bullets.map(b => b.moveForward()).filter(b => this.isInBounds(b));
    return new Board(this.width, this.height, this.ship, this.asteroids, bullets);
  }

  isInBounds(obj) {
    let { x, y } = obj.getPlacement();
    return x > 0 && y > 0 && x < this.width && y < this.height;
  }
}
