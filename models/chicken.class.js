/**
 * Chickens are created in this class. Certain values are automatically added, such as size, width and the Y coordinates, as well as certain images. 
 * @extends MovableObject
 */
class Chicken extends MovableObject {
    height = 55;
    y = 360;
    width = 70;
    isDead;
    movementTimer;
    animationTimer;
    moveChickenLeftINT
    playWalkingAnimationsChickenINT
    characterJumpedOnChicken = false

    IMAGES_WALKING = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ];

    IMAGE_DEAD = 'img/3_enemies_chicken/chicken_normal/2_dead/dead.png';


    /**
     * Walking images are saved, X position is generated between 1500 and 2000 px. Speed is different for each chicken.
     * Offsets represent the limit for collision detection.
     * isDead is set to false. This means that the chicken is alive.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.IMAGES_WALKING);
        this.x = Math.random() * 500 + 1500;
        this.speed = 0.15 + Math.random() * 0.5;
        this.offset = { top: 4, bottom: 5, right: 5, left: 2 };
        this.isDead = false;
        this.movementTimer = null;
        this.animationTimer = null;
    }


    /**
     * The intervals for the movement to the left and the animation are started.
     */
    animate() {
        this.moveChickenLeftINT = this.setStoppableInterval(() => this.moveLeft(), 1000 / 60);
        this.playWalkingAnimationsChickenINT = this.setStoppableInterval(() => this.playWalkingAnimations(), 200);
    }


    /**
     * If the chicken is alive, it can move to the left, otherwise the intervals are stopped.
     */
    moveLeft() {
        if (!this.isDead) {
            super.moveLeft();
        } else {
            this.stopIntervals()
        }
    }


    /**
     * When the chicken is alive, walking animations are displayed.
     */
    playWalkingAnimations() {
        if (!this.isDead) {
            this.playAnimation(this.IMAGES_WALKING);
        }
    }


    /**
     * If the chicken dies, isDead is set to true. IMAGE_DEAD is displayed and the movement intervals are stopped. 
     */
    chickenIsDead() {
        if (!this.isDead) {
            this.isDead = true;
            this.loadImage(this.IMAGE_DEAD);
            clearInterval(this.movementTimer);
            clearInterval(this.animationTimer);
        }
    }

    
    /**
     * Movement intervals are stopped.
     */
    stopIntervals() {
        if (this.isDead) {
            clearInterval(this.moveChickenLeftINT)
            clearInterval(this.playWalkingAnimationsChickenINT)
        }  
    }
}