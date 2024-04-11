/**
 * In this class is the logic for the game.
 */
class WorldGameLogic {
  level;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  bottles = 0;
  character;
  endBoss;
  endBossDefeated = false;
  showCongratulationsScreen = false;
  gameIsRunning = false;
  playOneTime = 0;
  i = 0
  animationFrameId
  worldGameLogic
  startScreen
  endScreen
  congratulations
  enemies
  instructionsDivClosed = true
  infoDivClosed = true
  howToPlayWindowOpen = false
  musicPlays = true
  worldUI

  statusBar = {
    'bottleStatusBar': new StatusBar(10, 'bottleStatusBar', 40),
    'healthStatusBar': new StatusBar(50, 'healthStatusBar', 40),
    'coinStatusBar': new StatusBar(95, 'coinStatusBar', 40),
    'bossChickenHealth': new StatusBar(10, 'bossChickenHealth', 470),
    'hearthFromBossChicken': new StatusBar(15, 'hearthFromBossChicken', 455),
  };

  throwableObjects = [];

  music = {
    'backgroundMusic': new Audio('audio/El Pollo Loco Music.mp3'),
    'takeCoinMusic': new Audio('audio/take_coin.wav'),
    'collision': new Audio('audio/collision.wav'),
    'throwBottle': new Audio('audio/throwingBottle.wav'),
    'takeBottleMusic': new Audio('audio/takeBottle.wav'),
    'killChicken': new Audio('audio/chicken kill.wav'),
    'hurtEndboss': new Audio('audio/EndBoss_hurt.wav'),
    'gameOver': new Audio('audio/GAME_OVER_SOUND.wav'),
    'congratulations': new Audio('audio/congratulations.wav')
  };

  /**
   * Constructs a worldGameLogic instance, initializing the canvas, keyboard, and other essential components.
   * 
   * @param {HTMLCanvasElement} canvas - The canvas element where the game will be drawn.
   * @param {Object} keyboard - An object representing the state of keyboard keys.
   */
  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.worldGameLogic = this;
    this.startScreen = new Startscreen();
    this.endScreen = new Endscreen();
    this.congratulations = new BackgroundObject('img/9_intro_outro_screens/success/congratulations.png', 0);
    this.speakerOn = new BackgroundObject('img/5_background/speaker/speaker.png', 330);
    this.speakerOn.height = 30
    this.speakerOn.width = 30
    this.speakerOn.y = 35
    this.speakerOff = new BackgroundObject('img/5_background/speaker/switch_off_speaker.png', 330);
    this.speakerOff.height = 30
    this.speakerOff.width = 30
    this.speakerOff.y = 35
    this.gamePad2 = new BackgroundObject('img/10_start_screen/joystick.png', 370);
    this.gamePad2.height = 30
    this.gamePad2.width = 35
    this.gamePad2.y = 35
    this.isEndBossAnimationStarted = false;
    this.worldUI = new WorldUI(this.worldGameLogic)
    this.worldUI.displayStartScreen();
  }

  /**
   * Handles the logic to start the game when the start button is pressed.
   */
  startGameButtonPressed() {
    if (this.checkTheExistenceOfOverlayTurnDevice()) {
      this.gameIsRunning = true
      this.shouldGameStart()
    }
  }

  /**
   * Checks, if #turnDevice is on, when yes, game cannot be started, because the player need to turn his phone.
   * @returns "true" if displayStyle is set on "none", "false" when displayStyle is set on "flex".
   */
  checkTheExistenceOfOverlayTurnDevice() {
    let turnDevice = document.getElementById('turnDevice');
    let displayStyle = window.getComputedStyle(turnDevice).display;
    if (displayStyle === 'none') {
      return true
    } else {
      return false
    }
  }

  /**
   * Checks and initializes the game if it should start.
   */
  shouldGameStart() {
    if (this.gameIsRunning) {
      this.level = level1;
      this.endBoss = this.level.enemies[this.level.enemies.length - 1];
      this.enemies = this.level.enemies
      this.character = new Character(this.worldGameLogic);
      document.getElementById('StartGame').style.display = 'none'
      document.getElementById('gamePad').style.display = 'none'
      document.getElementById('info').style.display = 'none'
      document.getElementById('instructions').style.display = 'none'
      document.getElementById('infoDiv').style.display = 'none'
      document.getElementById('speakerOn').style.display = 'flex'
      document.getElementById('gamePad2').style.display = 'flex'
      if (window.innerWidth <= 933 && window.innerHeight <= 431) {
        document.getElementById('containerForButtons').style.display = 'flex'
      }
      this.enemies.slice(0, 8).forEach(enemy => enemy.animate())
      this.startGame();
    }
  }


  /**
   * Initiates the game loop and plays background music.
   */
  startGame() {
    this.worldUI.draw();
    this.run();
    this.playBackgroundMusic();
  }

  /**
   * Sets the world reference for the character.
   */
  setWorld() {
    this.character.worldGameLogic = this;
  }

  /**
   * Main game loop that handles game updates.
   */
  run() {
    this.runGame();
    this.animationFrameId = requestAnimationFrame(this.run.bind(this));
  }

  /**
   * Handles all the game logic that needs to be checked each frame.
   */
  runGame() {
    this.checkCollisionsWithChickens();
    this.checkCollisionsWithBoss();
    this.checkThrowObjects();
    this.checkCollisionOfBottlesWithBoss();
    this.checkCharacterPosition();
    this.startToMoveEndBoss();
    this.endBoss.moveRight()
    this.character.reachedCharacterTheBorder()
    this.endBoss.moveLeft()
    this.takeObject(
      this.level.bottles,
      this.music.takeBottleMusic,
      this.level.bottles,
      () => {
        this.statusBar.bottleStatusBar.takenBottles++;
        this.statusBar.bottleStatusBar.setIndexForStatusBar(this.statusBar.bottleStatusBar.IMAGES_BOTTLE, this.statusBar.bottleStatusBar.takenBottles);
      }
    );
    this.takeObject(
      this.level.coins,
      this.music.takeCoinMusic,
      this.level.coins,
      () => {
        this.statusBar.coinStatusBar.takenCoins++;
        this.statusBar.coinStatusBar.setIndexForStatusBar(this.statusBar.coinStatusBar.IMAGES_COIN, this.statusBar.coinStatusBar.takenCoins);
      }
    );
  }

  /**
    * Determines the end boss's direction based on the character's position.
  */
  checkCharacterPosition() {
    if (this.endBoss.x + this.endBoss.width - this.endBoss.offset.right < this.character.x) {
      this.endBoss.otherDirection = true
    }
    else if (this.endBoss.x + this.endBoss.offset.left > this.character.x) {
      this.endBoss.otherDirection = false
    }
  }

  /**
    * Starts the end boss's movement animation.
  */
  startToMoveEndBoss() {
    if (!this.isEndBossAnimationStarted) {
      this.isEndBossAnimationStarted = true;
      this.endBoss.animate(this.endBoss.IMAGES_WALKING);
    }
  }

  /**
     * Plays a sound effect, updates the status bar, and removes the object from the game.
     * 
     * @param {Array} objects - The array of objects to check for collision.
     * @param {Audio} music - The sound effect to play when an object is taken.
     * @param {Array} removeObjectFromArray - The array from which the object should be removed.
     * @param {Function} updateStatusBar - The function to update the status bar.
     * Handles the logic for taking objects (like bottles or coins) in the game world.
    */
  takeObject(objects, music, removeObjectFromArray, updateStatusBar) {
    objects.forEach((object) => {
      if (this.character.isColliding(object)) {
        if (this.musicPlays) {
          this.worldUI.playAudio(music)
        }
        this.removeObject(removeObjectFromArray, object);
        updateStatusBar();
        if (objects === this.level.bottles) {
          this.bottles++;
        }
      }
    });
  }

  /**
  * Checks and handles the logic for throwing objects in the game.
  */
  checkThrowObjects() {
    if (this.keyboard.D && this.bottles > 0) {
      if (this.musicPlays) {
        this.worldUI.playAudio(this.music.throwBottle)
      }
      let bottle;
      if (this.character.otherDirection) {
        bottle = new ThrowableObject(this.character.x - 20, this.character.y + 100, this.character);
        bottle.directionLeft = true;
      } else {
        bottle = new ThrowableObject(this.character.x + 70, this.character.y + 100, this.character);
      }

      this.throwableObjects.push(bottle);
      this.bottles--;
      this.statusBar.bottleStatusBar.takenBottles--;
      this.statusBar.bottleStatusBar.setIndexForStatusBar(this.statusBar.bottleStatusBar.IMAGES_BOTTLE, this.statusBar.bottleStatusBar.takenBottles);
      this.keyboard.D = false;
    }
  }

  /**
  * Checks for collisions between the character and chickens.
  */
  checkCollisionsWithChickens() {
    this.level.enemies.slice(0, 8).forEach((enemy) => {
      if (this.character.isColliding(enemy) && !enemy.isDead && this.character.characterJumped) {
        enemy.chickenIsDead();
        if (this.musicPlays) {
          this.worldUI.playAudio(this.music.killChicken)
        }
        this.character.performLightJump();
      } else if (this.character.isColliding(enemy) && !enemy.isDead) {
        if (this.musicPlays) {
          this.worldUI.playAudio(this.music.collision)
        }
        this.character.hit(0.5);
        this.statusBar.healthStatusBar.setPercentage(this.character.energy, this.statusBar.healthStatusBar.IMAGES_HEALTH);
      }
    });
  }

  /**
  * Checks for collisions between the character and the end boss.
  */
  checkCollisionsWithBoss() {
    if (this.character.isCollidingEndboss(this.endBoss) && !this.endBoss.isDead) {
      if (this.musicPlays) {
        this.worldUI.playAudio(this.music.collision)
      }
      this.character.hit(2);
      this.statusBar.healthStatusBar.setPercentage(this.character.energy, this.statusBar.healthStatusBar.IMAGES_HEALTH);
    }
  }

  /**
  * Checks for collisions of thrown bottles with the end boss.
  */
  checkCollisionOfBottlesWithBoss() {
    this.throwableObjects.forEach(bottle => {
      if (bottle.isColliding(this.endBoss)) {
        bottle.isCollidingWithEndBoss = true;
        if (this.musicPlays) {
          this.worldUI.playAudio(this.music.hurtEndboss)
        }
        this.endBoss.hit();
        this.statusBar.bossChickenHealth.setPercentage2(this.endBoss.energy, this.statusBar.bossChickenHealth.IMAGES_HEALTH);
        this.removeObject(this.throwableObjects, bottle);
        if (this.endBoss.energy <= 0) {
          clearInterval(this.endBoss.movementTimer)
          this.endBoss.endBossIsDead();
          this.scheduleCongratulationsScreen();
        } else {
          this.endBoss.hurtEndBoss();
        }
      }

      else if (bottle.bottleFellOnTheGround()) {
        this.removeObject(this.throwableObjects, bottle)
      }
    });
  }

  /**
  * Stops the game.
  */
  stopGame() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null
    }
    this.level.enemies.forEach(enemy => {
      enemy.isDead = true;
    });
    this.character.stopIntervals()
    this.stopMusic();
  }

  /**
  * Resets the game.
  */
  resetGame() {
    window.location.reload();
  }

  /**
  * Removes an object from a given array.
  * 
  * @param {Array} array - The array from which the object should be removed.
  * @param {Object} object - The object to be removed.
  */
  removeObject(array, object) {
    const index = array.indexOf(object);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  /**
    * Handles the game over state.
  */
  gameOver() {
    this.stopGame();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.addToMap(this.endScreen);
    this.playOneTime++
    if (this.playOneTime == 1) {
      if (this.musicPlays) {
        this.worldUI.playAudio(this.music.gameOver);
      }
    }
    let playAgainButton = document.getElementById('playAgain');
    playAgainButton.style.display = 'flex';
    document.getElementById('speakerOff').style.display = 'none'
    document.getElementById('speakerOn').style.display = 'none'
    document.getElementById('gamePad2').style.display = 'none'
    document.getElementById('containerForButtons').style.display = 'none'
  }

  /**
    * Adds an array of DrawableObjects to the game map.
    * 
    * @param {DrawableObject[]} objects - The array of DrawableObjects to be added.
  */
  addObjectsToMap(objects) {
    objects.forEach(o => {
      this.addToMap(o);
    });
  }

  /**
  * Adds a DrawableObject to the game map.
  * 
  * @param {DrawableObject} mo - The DrawableObject to be added.
  */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.worldUI.flipImage(mo);
    }

    mo.draw(this.ctx);

    if (mo.otherDirection) {
      this.worldUI.flipImageBack(mo);
    }
  }

  /**
  * Schedules the congratulations screen to be shown.
  */
  scheduleCongratulationsScreen() {
    setTimeout(() => {
      this.showCongratulationsScreen = true;
    }, 2000);
  }

  /**
  * Stops the background music.
  */
  stopMusic() {
    this.music.backgroundMusic.pause();
  }

  /**
   * Plays the background music of the game.
   */
  playBackgroundMusic() {
    this.music.backgroundMusic.loop = 'true';
    this.music.backgroundMusic.volume = 0.2;
    if (this.musicPlays) {
      this.worldUI.playAudio(this.music.backgroundMusic)
    }
  }

  /**
  * Hides the instruction and information divs, and displays the game canvas.
  */
  return() {
    document.getElementById('parentDivOfInstructions').style.display = 'none'
    document.getElementById('parentDivOfInfo').style.display = 'none'
    document.getElementById('canvas').style.display = 'flex'
  }
}