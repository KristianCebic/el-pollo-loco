/**
 * Represents the start screen of a game, extending the DrawableObject class.
 * This class is responsible for displaying the start screen image and setting its dimensions and position.
 * 
 * @extends DrawableObject
 */
class Startscreen extends DrawableObject {

    /**
     * Constructs a Startscreen instance with predefined settings.
     * It loads the start screen image and sets its dimensions and position.
     */
    constructor() {
        super();
        this.loadImage('img/9_intro_outro_screens/start/startscreen_1.png');
        this.width = 720;
        this.height = 480;
        this.x = 0;
        this.y = 0;
    }
}
