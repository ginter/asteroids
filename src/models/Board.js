import Ship from './Ship.js';
import Asteroid from './Asteroid.js';

const MAX_ASTEROID_COUNT = 10;

function wrap(coord, max) {
  coord = coord % max;
  if (coord < 0) coord = max + coord;

  return coord;
}

export default class Board {
  constructor(width=window.innerWidth, height=window.innerHeight, ship=new Ship(), asteroids=[]){
    this.width = width;
    this.height = height;
    this.ship = ship;
    this.asteroids = asteroids;
  }

  shipPlacement() {
    let { x, y, direction } = this.ship.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  shipSpeed() {
    return this.ship.speed;
  }

  moveShipForward() {
    return new Board(this.width, this.height, this.ship.moveForward(), this.asteroids);
  }

  moveShipBackward() {
    return new Board(this.width, this.height, this.ship.moveBackward(), this.asteroids);
  }

  turnShipLeft() {
    return new Board(this.width, this.height, this.ship.turnLeft(), this.asteroids);
  }

  turnShipRight() {
    return new Board(this.width, this.height, this.ship.turnRight(), this.asteroids);
  }

  increaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.increaseSpeed(), this.asteroids);
  }

  decreaseShipSpeed() {
    return new Board(this.width, this.height, this.ship.decreaseSpeed(), this.asteroids);
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

    return new Board(this.width, this.height, this.ship, this.asteroids.concat([asteroid]));
  }

  moveAsteroidsForward() {
    const asteroids = this.asteroids.map(a => a.moveForward());
    return new Board(this.width, this.height, this.ship, asteroids);
  }
}
