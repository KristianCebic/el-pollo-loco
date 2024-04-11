/**
 * Represents a character object in the game.
 * This class extends MovableObject to provide character-specific behavior.
 */
class Character extends MovableObject {
  height = 280;
  y = 80;
  speed = 10;
  worldGameLogic;
  walking_sound = new Audio('audio/walking_in_long_grass.wav');
  characterIsJustStanding = 0;
  idleAnimation;
  standsLongTime = false;
  moveCharacterINT
  checkIfStandingINT
  playCharacterINT
  playAudioPromise
  cameraIndex = 100
  characterJumped = false

  /**
    * Images, when the character is just standing.
  */
  IMAGES_IDLE = [
    'img/2_character_pepe/1_idle/idle/I-1.png',
    'img/2_character_pepe/1_idle/idle/I-2.png',
    'img/2_character_pepe/1_idle/idle/I-3.png',
    'img/2_character_pepe/1_idle/idle/I-4.png',
    'img/2_character_pepe/1_idle/idle/I-5.png',
    'img/2_character_pepe/1_idle/idle/I-6.png',
    'img/2_character_pepe/1_idle/idle/I-7.png',
    'img/2_character_pepe/1_idle/idle/I-8.png',
    'img/2_character_pepe/1_idle/idle/I-9.png',
    'img/2_character_pepe/1_idle/idle/I-10.png'
  ];

  /**
    * Images, when the character is standing longer time (sleep).
  */
  IMAGES_LONG_IDLE = [
    'img/2_character_pepe/1_idle/long_idle/I-11.png',
    'img/2_character_pepe/1_idle/long_idle/I-12.png',
    'img/2_character_pepe/1_idle/long_idle/I-13.png',
    'img/2_character_pepe/1_idle/long_idle/I-14.png',
    'img/2_character_pepe/1_idle/long_idle/I-15.png',
    'img/2_character_pepe/1_idle/long_idle/I-16.png',
    'img/2_character_pepe/1_idle/long_idle/I-17.png',
    'img/2_character_pepe/1_idle/long_idle/I-18.png',
    'img/2_character_pepe/1_idle/long_idle/I-19.png',
    'img/2_character_pepe/1_idle/long_idle/I-20.png'
  ];

  /**
    * Images, when the character is walking.
  */
  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  /**
    * Images, when the character is jumping.
  */
  IMAGES_JUMPING = [
    'img/2_character_pepe/3_jump/J-31.png',
    'img/2_character_pepe/3_jump/J-32.png',
    'img/2_character_pepe/3_jump/J-33.png',
    'img/2_character_pepe/3_jump/J-34.png',
    'img/2_character_pepe/3_jump/J-35.png',
    'img/2_character_pepe/3_jump/J-36.png',
    'img/2_character_pepe/3_jump/J-37.png',
    'img/2_character_pepe/3_jump/J-38.png',
    'img/2_character_pepe/3_jump/J-39.png',
  ];

  /**
    * Images, when the character will be hurted.
  */
  IMAGES_HURT = [
    'img/2_character_pepe/4_hurt/H-41.png',
    'img/2_character_pepe/4_hurt/H-42.png',
    'img/2_character_pepe/4_hurt/H-43.png',
  ];

  /**
    * Images, when the character will be dead.
  */
  IMAGES_DEAD = [
    'img/2_character_pepe/5_dead/D-51.png',
    'img/2_character_pepe/5_dead/D-52.png',
    'img/2_character_pepe/5_dead/D-53.png',
    'img/2_character_pepe/5_dead/D-54.png',
    'img/2_character_pepe/5_dead/D-55.png',
    'img/2_character_pepe/5_dead/D-57.png',
  ];


  /**
    * This class creates a character.
    * @param {MyClass} worldGameLogic - Parameter is the worldGameLogic class.
    * The animations for the chicken automaticly start.
    * Offsets are used for collision detection and vary based on the bottle type.
  */
  constructor(worldGameLogic) {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.worldGameLogic = worldGameLogic;
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
    this.offset = { top: 120, bottom: 14, left: 20, right: 30 };
  }


  /**
    * Sets intervals for certain animations. (moving, jumping, standing animations).
  */
  animate() {
    this.moveCharacterINT = this.setStoppableInterval(() => this.moveCharacter(), 1000 / 60);
    this.checkIfStandingINT = this.setStoppableInterval(() => this.checkIfStanding(), 1000);
    this.playCharacterINT = this.setStoppableInterval(() => this.playCharacter(), 100);
    this.setJumpFalse = this.setStoppableInterval(() => this.setJumpOnFalse(), 100)
    this.setJumpTrue = this.setStoppableInterval(() => this.setJumpOnTrue(), 100)
  }


  /**
    * Every setted interval will be cleared.
  */
  stopIntervals() {
    clearInterval(this.moveCharacterINT)
    clearInterval(this.checkIfStandingINT)
    clearInterval(this.playCharacterINT)
    clearInterval(this.setJumpFalse)
    clearInterval(this.setJumpTrue)
  }


  /**
    * If character jumps, the variable characterJumped will be setted on true.
  */
  setJumpOnTrue() {
    if (this.y < 130) {
      this.characterJumped = true
    }
  }


  /**
    * If character will be again on the ground, the variable characterJumped will be setted on false.
  */
  setJumpOnFalse() {
    if (this.y == 150) {
      this.characterJumped = false
    }
  }

  /**
    * Based on conditions character starts to move, either right, left or jump.
  */
  moveCharacter() {
    this.walking_sound.pause();
    if (this.canMoveRight())
      this.moveRight();
    if (this.canMoveLeft())
      this.moveLeft();
    if (this.canJump())
      this.jump();
    this.worldGameLogic.camera_x = -this.x + this.cameraIndex;
  }


  /**
    * Character will move right.
    * otherDirection will be setted on false. otherDirection is a bool variable, if "true", the character should return on the left side, if false, the character will return on the right side.
    * Plays Audio for walking.
  */
  moveRight() {
    super.moveRight();
    this.otherDirection = false;
    if (this.worldGameLogic.musicPlays) {
      this.playAudio(this.walking_sound);
    }
  }


  /**
      * Character will move left.
      * otherDirection will be setted on true. otherDirection is a bool variable, if "true", the character should return on the left side, if false, the character will return on the right side.
      * Plays Audio for walking.
   */
  moveLeft() {
    super.moveLeft();
    if (this.worldGameLogic.musicPlays) {
      this.playAudio(this.walking_sound);
    }
    this.otherDirection = true;
  }


  /**
   * The character can only move to the right if the variable RIGHT becomes "true" and X will not be greater than the end of the world.
   * @returns true, if both variable are true.
   */
  canMoveRight() {
    return this.worldGameLogic.keyboard.RIGHT && this.x < this.worldGameLogic.level.level_end_x;
  }

  /**
   * The character can only move to the left if the variable LEFT is "true" and X is greater than 0.
   * @returns true, if both variable are true.
   */
  canMoveLeft() {
    return this.worldGameLogic.keyboard.LEFT && this.x > 0;
  }

  /**
   * The character can only jump if isAboveGround becomes false (i.e. the character is not in the air) and SPACE becomes "true".
   * @returns true, if both variable are true.
   */
  canJump() {
    return !this.isAboveGround() && (this.worldGameLogic.keyboard.SPACE);
  }


  /**
   * 
   * @returns 
   */
  isWalking() {
    return this.worldGameLogic.keyboard.RIGHT || this.worldGameLogic.keyboard.LEFT;
  }


  /**
   * If the idleAnimation becomes true (i.e. the standing animation is displayed), characterIsJustStanding is incremented. As soon as characterIsJustStanding has the value 20, standsLongTime is given the value "true" to express that the character has been standing for a very long time and a "sleep" animation should be displayed.
   */
  checkIfStanding() {
    if (this.idleAnimation) {
      this.characterIsJustStanding++;
      if (this.characterIsJustStanding == 20) {
        this.standsLongTime = true;
      }
    }
  }


  /**
   * This function displays different character animations depending on the situation and conditions. For example, if the character dies, a dead animation is displayed.
   */
  playCharacter() {
    if (this.isDead()) {
      this.playDead();
    }
    else if (this.isHurt()) {
      this.playHurt();
    }
    else if (this.isAboveGround()) {
      this.playJump();
    }
    else if (this.isWalking()) {
      this.playWalking();
    }
    else if (this.standsLongTime) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
    }
    else {
      this.playAnimation(this.IMAGES_IDLE);
      this.idleAnimation = true;
    }
  }


  /**
   * Dead animation: standsLongTime and idleAnimation are set to false again, and characterIsJustStanding is set to 0 again. 
   */
  playDead() {
    this.standsLongTime = false;
    this.playAnimation(this.IMAGES_DEAD);
    this.idleAnimation = false;
    this.characterIsJustStanding = 0;
  }


  /**
   * Hurt Animation: standsLongTime and idleAnimation are set to false again, and characterIsJustStanding is set to 0 again. 
   */
  playHurt() {
    this.standsLongTime = false;
    this.playAnimation(this.IMAGES_HURT);
    this.idleAnimation = false;
    this.characterIsJustStanding = 0;
  }

  /**
   * Jump Animation: standsLongTime and idleAnimation are set to false again, and characterIsJustStanding is set to 0 again. 
   */
  playJump() {
    this.standsLongTime = false;
    this.playAnimation(this.IMAGES_JUMPING);
    this.idleAnimation = false;
    this.characterIsJustStanding = 0;
  }


  /**
   * Walking animation: standsLongTime and idleAnimation are set to false again, and characterIsJustStanding is set to 0 again. 
   */
  playWalking() {
    this.standsLongTime = false;
    this.playAnimation(this.IMAGES_WALKING);
    this.idleAnimation = false;
    this.characterIsJustStanding = 0;
  }


  /**
   * For the jump animation, the speed (speedY) is set to 30. If musicPlays is set to "true", i.e. when the loudspeaker in the world class is switched on, the jump sound can be played.
   */
  jump() {
    this.speedY = 30;
    if (this.worldGameLogic.musicPlays) {
      this.playAudio(this.jumpSound);
    }
  }


  /**
   * As soon as the character jumps onto a chicken, he will jump off the chicken slightly. speedY (speed) is set to 25 and the y is set to 150 again. 
   */
  performLightJump() {
    this.speedY = 25;
    this.y = 150
  }


  /**
   * If x will be greater than 1900 and characterReachedTheBorder becomes "false", characterReachedTheBorder is set to "true" to express that the character has exceeded a border. If it exceeds this limit, this means that the end boss must move.
   */
  reachedCharacterTheBorder() {
    if (this.x > 1900 && !this.worldGameLogic.endBoss.characterReachedTheBorder)
      this.worldGameLogic.endBoss.characterReachedTheBorder = true
  }
}



