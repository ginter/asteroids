import Ship from './Ship.js';
import Asteroid from './Asteroid.js';
import Bullet from './Bullet.js';

const MAX_ASTEROID_COUNT = 10;
const BULLET_SPEED_MULTIPLIER = 1.5;

function wrap(coord, max) {
  coord = coord % max;
  if (coord < 0) coord = max + coord;

  return coord;
}

export default class Board {
  constructor(opts={}) {
    this.width = opts.width || window.innerWidth;
    this.height = opts.height || window.innerHeight;
    this.ship = opts.ship || new Ship();
    this.asteroids = opts.asteroids || [];
    this.bullets = opts.bullets || [];
    this.runningCollisions = opts.runningCollisions || 0;
  }

  shipPlacement() {
    let { x, y, direction } = this.ship.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  shipSpeed() {
    return this.ship.speed;
  }

  moveShipForward() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.moveForward(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  moveShipBackward() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.moveBackward(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  turnShipLeft() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.turnLeft(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  turnShipRight() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.turnRight(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  increaseShipSpeed() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.increaseSpeed(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  decreaseShipSpeed() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.decreaseSpeed(),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
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

    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: this.asteroids.concat([asteroid]),
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  moveAsteroidsForward() {
    const asteroids = this.asteroids.map(a => a.moveForward());
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  bulletPlacement(bullet) {
    let { x, y, direction } = bullet.getPlacement();
    return { left: wrap(x, this.width), top: wrap(y, this.height), direction: direction };
  }

  fireBullet() {
    let bullet = new Bullet({
      x: wrap(this.ship.x, this.width),
      y: wrap(this.ship.y, this.height),
      speed: this.ship.speed*BULLET_SPEED_MULTIPLIER,
      direction: this.ship.direction
    });

    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: this.asteroids,
      bullets: this.bullets.concat([bullet]),
      runningCollisions: this.runningCollisions
    });
  }

  moveBulletsForward() {
    const bullets = this.bullets.map(b => b.moveForward()).filter(b => this.isInBounds(b));
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: this.asteroids,
      bullets: bullets,
      runningCollisions: this.runningCollisions
    });
  }

  isInBounds(obj) {
    let { x, y } = obj.getPlacement();
    return x > 0 && y > 0 && x < this.width && y < this.height;
  }

  handleCollisions() {
    return this.bullets.reduce((board, bullet) => board.handleCollision(bullet), this);
  }

  handleCollision(bullet) {
    let collided = false;
    let asteroids = this.asteroids.reduce((list, asteroid) => {
      if (!this.hasCollided(bullet, asteroid)) return list.concat(asteroid);
      collided = true;
      return list.concat(asteroid.split());
    }, []);
    let bullets = collided ? this.bullets.filter((b) => b !== bullet) : this.bullets;

    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: asteroids,
      bullets: bullets,
      runningCollisions: collided ? ++this.runningCollisions : this.runningCollisions
    });
  }

  hasCollided(obj, asteroid) {
    const objX = wrap(obj.x, this.width);
    const objY = wrap(obj.y, this.height);
    const asteroidX = wrap(asteroid.x, this.width);
    const asteroidY = wrap(asteroid.y, this.height);

    return (objX > asteroidX && objX < (asteroidX + asteroid.size)) &&
      (objY > asteroidY && objY < (asteroidY + asteroid.size))
  }
}
