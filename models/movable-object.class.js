/**
 * Represents a movable object in a game environment, extending the DrawableObject class.
 * This class adds movement capabilities, collision detection, gravity application, and audio playback to drawable objects.
 * 
 * Properties:
 * - speed: The horizontal speed of the object.
 * - otherDirection: Flag indicating whether the object is moving in the opposite direction.
 * - speedY: The vertical speed of the object, used for jumping or gravity effects.
 * - acceleration: The acceleration rate of the object, affecting its speedY during gravity application.
 * - energy: The energy level of the object, used to determine its health status.
 * - lastHit: Timestamp of the last time the object was hit.
 * - jumpSound: Audio object for playing jump sound.
 * - intervalIds: Array of interval IDs for stoppable intervals.
 * - applyGravityINT: Interval ID for the gravity application.
 */
class MovableObject extends DrawableObject {
  speed = 2;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;
  jumpSound = new Audio('audio/jump.wav');
  intervalIds = [];
  applyGravityINT;

  /**
   * Checks for collision with another movable object.
   * @param {MovableObject} mo - The other movable object to check for collision.
   * @returns {boolean} True if there is a collision, false otherwise.
  */
  isColliding(mo) {
    let thisTop = this.y + this.offset.top
    let thisBottom = this.y + this.height - this.offset.bottom
    let thisRight = this.x + this.width - this.offset.right
    let thisLeft = this.x + this.offset.left

    let moTop = mo.y + mo.offset.top;
    let moBottom = mo.y + mo.height - mo.offset.bottom
    let moRight = mo.x + mo.width - mo.offset.right;
    let moLeft = mo.x + mo.offset.left;

    return thisRight > moLeft &&
      thisLeft < moRight &&
      thisBottom > moBottom &&
      thisTop < moBottom
  }

  
  /**
   * Checks for collision with endboss object.
   * @param {MovableObject} mo - The endboss object to check for collision.
   * @returns {boolean} True if there is a collision, false otherwise.
  */
  isCollidingEndboss(mo) {
    let thisTop = this.y + this.offset.top
    let thisBottom = this.y + this.height - this.offset.bottom
    let thisRight = this.x + this.width - this.offset.right
    let thisLeft = this.x + this.offset.left

    let moTop = mo.y + mo.offset.top;
    let moBottom = mo.y + mo.height - mo.offset.bottom
    let moRight = mo.x + mo.width - mo.offset.right;
    let moLeft = mo.x + mo.offset.left;

    return thisRight > moLeft &&
      thisLeft < moRight &&
      thisTop < moBottom
  }


  /**
   * Applies gravity to the object by adjusting its vertical position and speed.
  */
  applyGravity() {
    this.applyGravityINT = this.setStoppableInterval(() => this.gravitation(), 1000 / 25)
  }


  /**
   * Applies gravity to the object by adjusting its vertical position and speed.
  */
  gravitation() {
    if (this.isAboveGround() || this.speedY > 0) {
      this.y -= this.speedY;
      this.speedY -= this.acceleration;
    }
  }


  /**
    * Determines if the object is above the ground level.
    * For instances of ThrowableObject, it always returns true, indicating they are always considered above ground.
    * For other instances, it checks if the object's vertical position (y-coordinate) is less than a specific threshold (145).
    * @returns {boolean} True if the object is above ground level, false otherwise.
  */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      return true;
    } else {
      return this.y < 145;
    }
  }


  /**
 * Reduces the energy of the object when hit and updates the last hit time.
 * If the energy falls below 0, it is set to 0.
 * 
 * @param {number} hit - The amount of energy to be deducted.
 */
  hit(hit) {
    this.energy -= hit;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }


  /**
  * Determines if the object is currently hurt.
  * An object is considered hurt if less than 1 second has passed since the last hit.
  * 
  * @returns {boolean} True if the object is hurt, false otherwise.
  */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  
  /**
  * Checks if the object is dead (i.e., energy is 0).
  * 
  * @returns {boolean} True if the object's energy is 0, false otherwise.
  */
  isDead() {
    return this.energy == 0;
  }


  /**
  * Plays an animation sequence by cycling through an array of images.
  * The current image is updated in each call.
  * 
  * @param {string[]} images - An array of image paths for the animation frames.
  */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }


  /**
  * Moves the object to the right by increasing its x-coordinate by the object's speed.
  */
  moveRight() {
    this.x += this.speed;
  }


  /**
  * Moves the object to the left by decreasing its x-coordinate by the object's speed.
  */
  moveLeft() {
    this.x -= this.speed;
  }


  /**
  * Causes the object to jump by setting its vertical speed (speedY).
  * Also plays a jump sound effect.
  */
  jump() {
    this.speedY = 30;
    this.jumpSound.play();
  }


  /**
  * Checks if the object is on the ground.
  * The ground is defined as a specific y-coordinate (310 in this case).
  * 
  * @returns {boolean} True if the object's y-coordinate is greater than or equal to 310, false otherwise.
  */
  isOnTheGround() {
    return this.y >= 310;
  }


  /**
   * Checks if bottle fell on the ground.
   * @returns {boolean} True if the object's y-coordinate is greater than or equal to 440, false otherwise.
   */
  bottleFellOnTheGround() {
    return this.y >= 440
  }


  /**
  * Creates a new interval that can be stopped and adds its ID to a list.
  * 
  * @param {Function} fn - The function to be executed at each interval.
  * @param {number} time - The time in milliseconds between each execution of the function.
  * @returns {number} The ID of the created interval.
  */
  setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    this.intervalIds.push(id);
    return id;
  }


  /**
  * Plays an audio file. Handles scenarios where automatic playback is not supported.
  * 
  * @param {HTMLAudioElement} source - The audio source to be played.
  */
  playAudio(source) {
    var playAudioPromise = source.play();
    if (playAudioPromise !== undefined) {
      playAudioPromise.then(_ => {
      })
        .catch(error => {
          console.error("Fehler bei der Wiedergabe: ", error);
        });
    } else {
      console.log("Automatische Wiedergabe wird nicht unterstützt.");
    }
  }
}
