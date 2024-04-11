/**
 * Global variables for canvas, game world, and keyboard.
 */
let canvas;
let worldGameLogic;
let worldUI;
let keyboard = new Keyboard();


/**
 * Initializes the game by setting up the canvas and world objects.
 */
function init() {
    canvas = document.getElementById('canvas');
    worldGameLogic = new WorldGameLogic(canvas, keyboard);
    worldUI = new WorldUI(worldGameLogic);
}


/**
 * Event listeners for keydown actions to control the game.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }

    if (e.keyCode == 13) {
        keyboard.ENTER = true;
    }
});


/**
 * Event listeners for keyup actions to stop game controls.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }

    if (e.keyCode == 13) {
        keyboard.ENTER = false;
    }
});


/**
 * Touch event listeners for mobile controls - left movement.
 */
window.document.getElementById('btnLeft').addEventListener('touchstart', (e) => {
    e.preventDefault();
    keyboard.LEFT = true;
});
window.document.getElementById('btnLeft').addEventListener('touchend', (e) => {
    e.preventDefault();
    keyboard.LEFT = false;
})


/**
 * Touch event listeners for mobile controls - right movement.
 */
window.document.getElementById('btnRight').addEventListener('touchstart', (e) => {
     e.preventDefault();
     keyboard.RIGHT = true;
 });
window.document.getElementById('btnRight').addEventListener('touchend', (e) => {
     e.preventDefault();
     keyboard.RIGHT = false;
 });


/**
 * Touch event listeners for mobile controls - jump action.
 */
window.document.getElementById('btnJump').addEventListener('touchstart', (e) => {
     e.preventDefault();
     keyboard.SPACE = true;
 });
window.document.getElementById('btnJump').addEventListener('touchend', (e) => {
     e.preventDefault();
     keyboard.SPACE = false;
 });


/**
* Touch event listeners for mobile controls - throw action.
*/
window.document.getElementById('btnThrow').addEventListener('touchstart', (e) => {
     e.preventDefault();
     keyboard.D = true;
 });
window.document.getElementById('btnThrow').addEventListener('touchend', (e) => {
     e.preventDefault();
     keyboard.D = false;
 });