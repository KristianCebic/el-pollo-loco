/**
 * Endboss is created in this class. 
 * @extends MovableObject
 */
class Endboss extends MovableObject {
    height = 400;
    width = 250;
    y = 60;
    x = 2500
    movingLeft = false
    movingRight = false
    isDead = false;
    energy = 100;
    walkingAnimation = false;
    endBossHurtINT
    endBossWalkingINT
    endBossStandingINT
    endBossAttackingINT
    endBossDeadINT
    endBossDefeated = false;
    speed = 5
    characterReachedTheBorder = false
    gameRuns = false

    IMAGES_BOSS_CHICKEN = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];


    IMAGES_WALKING = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ];


    IMAGES_ATTACK = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ];


    IMAGES_HURT = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ];


    IMAGES_DEAD = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];


    /**
     * Images are loaded, offsets are set for collision detection, animate() function is called.
     */
    constructor() {
        super();
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_BOSS_CHICKEN);
        this.loadImages(this.IMAGES_ATTACK);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.animate(this.IMAGES_WALKING);
        this.offset = { top: 80, bottom: 50, right: 60, left: 45 };
        this.movementTimer = null;
    }


    /**
     * First, all intervals are stopped and then a specific animation is played depending on which array contains IMAGES.
     * @param {Array} IMAGES - IMAGES for the Animation.
     */
    animate(IMAGES) {
        this.stopAnimation();
        if (IMAGES === this.IMAGES_DEAD) {
            this.deadBossChickenAnimation();
        }

        else if (IMAGES === this.IMAGES_HURT) {
            this.hurtBossChickenAnimation();
        }

        else if (IMAGES === this.IMAGES_ATTACK) {
            this.attackingBossChickenAnimation();
        }

        else if (IMAGES === this.IMAGES_WALKING) {
            this.walkingAnimation = true;
            this.walkingBossChickenAnimation();
        }
    }


    /**
     * An interval for IMAGES_HURT is started.
     */
    hurtBossChickenAnimation() {
        this.endBossDeadINT = this.setStoppableInterval(() => this.playAnimation(this.IMAGES_HURT), 200)
    }


    /**
     * An interval for IMAGES_WALKING is started.
     */
    walkingBossChickenAnimation() {
        this.endBossWalkingINT = this.setStoppableInterval(() => this.playAnimation(this.IMAGES_WALKING), 200)
    }


    /**
     * An interval for IMAGES_BOSS_CHICKEN is started.
     */
    standingBossChickenAnimation() {
        this.endBossStandingINT = this.setStoppableInterval(() => this.playAnimation(this.IMAGES_BOSS_CHICKEN), 200)
    }


    /**
     * An interval for IMAGES_ATTACK is started.
     */
    attackingBossChickenAnimation() {
        this.endBossAttackingINT = this.setStoppableInterval(() => this.playAnimation(this.IMAGES_ATTACK), 200)
    }


    /**
     * An interval for IMAGES_DEAD is started.
     */
    deadBossChickenAnimation() {
        this.endBossDeadINT = this.setStoppableInterval(() => this.playAnimation(this.IMAGES_DEAD), 200)
    }


    /**
     * Deletes every interval.
     */
    stopAnimation() {
        clearInterval(this.endBossAttackingINT);
        clearInterval(this.endBossDeadINT);
        clearInterval(this.endBossHurtINT);
        clearInterval(this.endBossStandingINT);
        clearInterval(this.endBossWalkingINT);
    }


    /**
     * Move the end boss to the right.
     */
    moveRight() {
        if (this.otherDirection && !this.movingRight && !this.isDead) {
            clearInterval(this.movementTimer)
            this.movementTimer = this.setStoppableInterval(() => super.moveRight(), 1000 / 25)
            this.movingRight = true
            this.movingLeft = false
        }
    }


    /**
     * Move the end boss to the left.
     */
    moveLeft() {
        if (!this.otherDirection && !this.movingLeft && !this.isDead && this.characterReachedTheBorder) {
            clearInterval(this.movementTimer)
            this.movementTimer = this.setStoppableInterval(() => super.moveLeft(), 1000 / 25)
            this.movingLeft = true
            this.movingRight = false
        }
    }


    /**
     * When the final boss is attacked, its speed is set to 10 and a hurt animation is played. After 1 second, an attack animation is played.
     */
    hurtEndBoss() {
        this.speed = 10;
        this.animate(this.IMAGES_HURT)
        setTimeout(() => {
            this.animate(this.IMAGES_ATTACK)
        }, 1000);
    }


    /**
     * When the final boss will have energy == 0, the dead animation will be played.
     */
    endBossIsDead() {
        this.isDead = true;
        this.animate(this.IMAGES_DEAD);
    }


    /**
     * If the final boss is hit with a bottle, its energy is reduced by 10 units. If 0 becomes greater than energy, energy is set to 0. Otherwise, the current time of the last hit is saved in the lastHit.
     */
    hit() {
        this.energy -= 10;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
}