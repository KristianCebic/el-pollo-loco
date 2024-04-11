/**
 * Clouds are created in this class.
 * @extends MovableObject
 * Certain variables are set automatically (height, width and y).
 */
class Cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    moveLeftCloudINT;
    speed = 0.7


    /**
     * X Position is generated randomly.
     * Animate function is called.
     * @param {number} x - X position.
     */
    constructor(x) {
        super().loadImage('img/5_background/layers/4_clouds/1.png');
        this.x = x + Math.random() * 500;
        this.animate();
    }


    /**
     * Interval for moveLeft function from the super class is called. 
     */
    animate() {
        this.moveLeftCloudINT = this.setStoppableInterval(() => super.moveLeft(), 1000 / 15);
    }
}