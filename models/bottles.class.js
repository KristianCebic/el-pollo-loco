/**
 * Represents an bottle object in the game.
 * @extends MovableObject
 */
class Bottle extends MovableObject {
    y = 350;
    height = 70;
    width = 70;

    BOTTLE1 = '1_salsa_bottle_on_ground.png';
    BOTTLE2 = '2_salsa_bottle_on_ground.png';
    IMAGE_PATH = 'img/6_salsa_bottle/';

    /**
        * Creates a bottle image on certain position with specific offsets. 
        * Offsets are used for collision detection and vary based on the bottle type.
        * Randomly selects one of two types of bottles.
        * @param {number} x - The X position, where the bottle starts.
        * 
    */
    constructor(x) {
        super();
        this.imageName = Math.random() < 0.5 ? this.BOTTLE1 : this.BOTTLE2;
        this.loadImage(this.IMAGE_PATH + this.imageName);
        this.x = x;

        if (this.imageName === this.BOTTLE1) {
            this.offset = { top: 15, bottom: 9, left: 33, right: 16 };
        } else {
            this.offset = { top: 15, bottom: 10, left: 20, right: 25 };
        }
    }
}
