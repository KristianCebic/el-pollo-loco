/**
 * Coins are created in this class.
 * @extends DrawableObject
 * Certain variables are set automatically (height, width).
 * Images have been saved.
 */
class Coin extends DrawableObject {
    width = 130;
    height = 130;
    
    COINS = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ];


    /**
     * Loads the images, saves the positions on the canvas and determines the offset values.
     * @param {number} x - X sets horizontal position on canvas.
     * @param {number} y - Y sets vertical position on canvas.
     */
    constructor(x, y) {
        super();
        this.loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.COINS);
        this.x = x;
        this.y = y;
        this.offset = { top: 48, bottom: 48, right: 48, left: 48 };
    }
}