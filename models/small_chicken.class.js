/**
 * Represents a small chicken character in a game, which extends the functionality of MovableObject.
 * This class includes properties and methods specific to the behavior and animation of a small chicken character.
 * 
 * @extends MovableObject
 */
class Smallchicken extends MovableObject {
    height = 50;
    y = 365;
    width = 45;
    isDead;
    movementTimer;
    animationTimer;
    moveChickenSmallLeftINT
    playWalkingAnimationsChickenSmallINT

    IMAGES_SMALL_WALK = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ];

    IMAGE_SMALL_DEAD = 'img/3_enemies_chicken/chicken_small/2_dead/dead.png';


    /**
        * Constructs a Smallchicken instance with initial settings.
    */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.IMAGES_SMALL_WALK);
        this.x = Math.random() * 500 + 1200;
        this.speed = 0.15 + Math.random() * 0.5;
        this.offset = { top: 4, bottom: 6, right: 6, left: 4 };
        this.isDead = false;
        this.movementTimer = null;
        this.animationTimer = null;
    }


    /**
     * Starts the animations for the small chicken, including walking and moving left.
    */
    animate() {
        this.moveChickenSmallLeftINT = this.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        this.playWalkingAnimationsChickenSmallINT = this.setStoppableInterval(() => this.playWalkingAnimations(), 200);
    }


    /**
     * Moves the chicken to the left if it's not dead.
    */
    moveLeft() {
        if (!this.isDead) {
            super.moveLeft();
        } else {
            this.stopIntervals()
        }
    }


    /**
     * Plays the walking animations of the small chicken.
    */
    playWalkingAnimations() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_SMALL_WALK);
        }
    }


    /**
     * Changes the state of the chicken to dead and stops its movement and animation.
     */
    chickenIsDead() {
        if (!this.isDead) {
            this.isDead = true;
            this.loadImage(this.IMAGE_SMALL_DEAD);
            clearInterval(this.movementTimer);
            clearInterval(this.animationTimer);
        }
    }


    /**
     * Stops all intervals if the chicken is dead.
     */
    stopIntervals() {
        if (this.isDead) {
            clearInterval(this.moveChickenLeftINT)
            clearInterval(this.playWalkingAnimationsChickenINT)
        }
    }
}