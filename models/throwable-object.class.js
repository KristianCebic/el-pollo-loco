/**
 * Represents a throwable object in a game, extending the functionality of MovableObject.
 * This class manages the behavior and animation of throwable objects, like a bottle.
 * 
 * @extends MovableObject
 */
class ThrowableObject extends MovableObject {
    speedY = 30;
    speedX = 20;
    reachedTheTop = false;
    isCollidingWithEndBoss = false;
    character;
    directionLeft;
    throwINT;
    animateINT;

    IMAGES_BOTTLE_ROTATION = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    IMAGES_BOTTLE_SPLASH = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];


    /**
     * Constructs a ThrowableObject instance with initial settings.
     * 
     * @param {number} x - The initial horizontal position of the object.
     * @param {number} y - The initial vertical position of the object.
     * @param {Object} character - The character associated with the throwable object.
     */
    constructor(x, y, character) {
        super().loadImage('img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png');
        this.loadImages(this.IMAGES_BOTTLE_ROTATION);
        this.loadImages(this.IMAGES_BOTTLE_SPLASH);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
        this.animate();
        this.character = character;
    }

    
    /**
     * Initiates the throwing action for the object, applying gravity and movement.
     */
    throw() {
        this.speedY = 30;
        this.applyGravity();
        this.throwINT = this.setStoppableInterval(() => this.throwBottle(), 25)
        this.stopInterval()
    }


    /**
     * Stops the interval for throwing and animating if the object is on the ground.
     */
    stopInterval() {
        if(this.isOnTheGround()){
            clearInterval(this.throwINT);
            clearInterval(this.animateINT);
        }
    }


    /**
     * Handles the horizontal movement of the thrown object.
     */
    throwBottle() {
        if (this.directionLeft) {
            this.x -= 5;
        } else {
            this.x += 5;
        }
    }


    /**
     * Starts the animation of the object.
     */
    animate() {
        this.animateINT = this.setStoppableInterval(() => this.showAnimations(), 100);
    }

    
    /**
     * Shows animations for the object, changing based on its state (in the air or on the ground).
     */
    showAnimations() {
        this.bottleReachedTheTop();
    
        if (this.isOnTheGround() && this.reachedTheTop || this.isCollidingWithEndBoss) {
            this.playAnimation(this.IMAGES_BOTTLE_SPLASH);
        } else {
            this.playAnimation(this.IMAGES_BOTTLE_ROTATION);
        }
    }


    /**
     * Determines if the object has reached its peak height after being thrown.
     */
    bottleReachedTheTop() {
        if (this.y < 70) {
            this.reachedTheTop = true;
        }
    }
}