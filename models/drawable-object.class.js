/**
 * This is the top class. The images are stored here (imageCache), x-y positions. This is a central class, so to speak, where the draw function is also located.
 */
class DrawableObject {
    img;
    imageCache = {};
    currentImage = 0;
    x = 120;
    y = 280;
    height = 150;
    width = 100;

    offset = {
        top: 0,
        bottom: 0,
        right: 0,
        left: 0
    };

    /**
     * Creates a new img.
     * @param {string} path - Path to the img. 
     * Saves the path for the img.
     */
    loadImage(path) {
        this.img = new Image(); 
        this.img.src = path;
    }


    /**
     * The image with its coordinates and sizes is drawn on the canvas.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }


    /**
     * The images are saved in imageCache. 
     * @param {Array} arr - ['img/image1.png', 'img/image2.png', ...]
     */
    loadImages(arr) {
        if (arr) {
            arr.forEach((path) => {
                let img = new Image();
                img.src = path;
                this.imageCache[path] = img;
            });
        }
    }
}