/**
 * Creates game_over end-screen. 
 * @extends DrawableObject
 */
class Endscreen extends DrawableObject{
    
    /**
     * Automatically sets the coordinates and sizes for the game_over screen.
     */
    constructor () {
        super();
        this.x = 0;
        this.y = 0;
        this.loadImage('img/9_intro_outro_screens/game_over/you lost.png');
        this.width = 720;
        this.height = 480;
    }
}