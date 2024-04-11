/**
* Represents a background object in the game.
* This object is movable and can display an image.
* @extends MovableObject
*/
class BackgroundObject extends MovableObject {
    width = 720;
    height = 480;
    showCongratulationsScreen = false;

    /**
        * Creates a new BackgroundObject instance.
        * @param {string} imagePath The relative path to the img.
        * @param {number} x The X position where the background starts.
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}