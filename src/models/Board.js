import Ship from './Ship.js';
import Asteroid from './Asteroid.js';
import Bullet from './Bullet.js';

const MAX_ASTEROID_COUNT = 12;
const BULLET_SPEED_MULTIPLIER = 1.5;

export default class Board {
  constructor(opts={}) {
    this.width = opts.width || window.innerWidth;
    this.height = opts.height || window.innerHeight;
    this.ship = opts.ship || new Ship();
    this.asteroids = opts.asteroids || [];
    this.bullets = opts.bullets || [];
    this.runningCollisions = opts.runningCollisions || [];
  }

  shipPlacement() {
    let { x, y, direction } = this.ship.getPlacement();
    return { left: x, top: y, direction: direction };
  }

  shipSpeed() {
    return this.ship.speed;
  }

  moveShipForward() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.moveForward(this.width, this.height),
      asteroids: this.asteroids,
      bullets: this.bullets,
      runningCollisions: this.runningCollisions
    });
  }

  moveShipBackward() {
    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship.moveBackward(this.width, this.height),
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
    return { left: x, top: y, direction: direction };
  }

  spawnAsteroids() {
    if (this.hasMaxAsteroids()) return this;

    let asteroid = new Asteroid({
      x: Math.random() * this.width,
      y: Math.random() * this.height,
      direction: Math.random() * 360,
      speed: Math.random() * Math.pow(Math.max(this.runningCollisions.length, 1), .33)
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
    const asteroids = this.asteroids.map(a => a.moveForward()).filter(a => this.isInBounds(a));
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
    return { left: x, top: y, direction: direction };
  }

  fireBullet() {
    let bullet = new Bullet({
      x: this.ship.x,
      y: this.ship.y,
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
    return this.isOverlapping(obj, this);
  }

  handleCollisions() {
    return this.bullets.reduce((board, bullet) => board.handleCollision(bullet), this);
  }

  handleCollision(bullet) {
    let collided = false;
    let asteroids = this.asteroids.reduce((list, asteroid) => {
      if (!this.isOverlapping(bullet, asteroid)) return list.concat(asteroid);
      collided = asteroid.size;
      return list.concat(asteroid.split());
    }, []);
    let bullets = collided ? this.bullets.filter((b) => b !== bullet) : this.bullets;

    return new Board({
      width: this.width,
      height: this.height,
      ship: this.ship,
      asteroids: asteroids,
      bullets: bullets,
      runningCollisions: collided ? this.runningCollisions.concat(collided) : this.runningCollisions
    });
  }

  isOverlapping(obj1, obj2) {
    let obj1X = obj1.x || 0;
    let obj1Y = obj1.y || 0;
    let obj2X = obj2.x || 0;
    let obj2Y = obj2.y || 0;

    return(
      ((obj1X > obj2X && obj1X < (obj2X + obj2.width)) &&
       (obj1Y > obj2Y && obj1Y < (obj2Y + obj2.height))) ||
      ((obj1X + obj1.width > obj2X && obj1X + obj1.width < (obj2X + obj2.width)) &&
       (obj1Y > obj2Y && obj1Y < (obj2Y + obj2.height))) ||
      ((obj1X > obj2X && obj1X < (obj2X + obj2.width)) &&
       (obj1Y + obj1.height > obj2Y && obj1Y + obj1.height < (obj2Y + obj2.height))) ||
      ((obj1X + obj1.width > obj2X && obj1X + obj1.width < (obj2X + obj2.width)) &&
       (obj1Y + obj1.height > obj2Y && obj1Y + obj1.height < (obj2Y + obj2.height)))
    );
  }
}
