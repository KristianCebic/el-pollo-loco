/**
 * Represents a status bar in a game, extending the functionality of MovableObject.
 * This class represents different types of status bars like health, coins, and bottles collected.
 * 
 * @extends MovableObject
 */
class StatusBar extends MovableObject {
    x = 40;
    y;
    width = 200;
    height = 60;
    percentage = 100;
    takenCoins = 0;
    takenBottles = 0;

    IMAGES_HEALTH = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    IMAGES_COIN = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/blue/100.png'
    ];

    IMAGES_BOTTLE = [
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/blue/100.png',
    ];


    /**
     * Constructs a StatusBar instance with specified settings.
     * 
     * @param {number} y - The vertical position of the status bar.
     * @param {string} element - The type of status bar ('coinStatusBar', 'bottleStatusBar', 'healthStatusBar', 'bossChickenHealth').
     * @param {number} [x] - The horizontal position of the status bar.
     */
    constructor(y, element, x) {
        super();
        this.y = y;
        this.x = x;

        if (element == 'coinStatusBar') {
            this.loadImages(this.IMAGES_COIN);
            this.setIndexForStatusBar(this.IMAGES_COIN, this.takenCoins);
        }
        else if (element == 'bottleStatusBar') {
            this.loadImages(this.IMAGES_BOTTLE);
            this.setIndexForStatusBar(this.IMAGES_BOTTLE, this.takenBottles);

        } else if (element == 'healthStatusBar') {
            this.loadImages(this.IMAGES_HEALTH);
            this.setPercentage(100, this.IMAGES_HEALTH);

        } else if (element == 'bossChickenHealth') {
            this.loadImages(this.IMAGES_HEALTH);
            this.setPercentage(100, this.IMAGES_HEALTH);

        } else {
            this.loadImage('img/7_statusbars/3_icons/icon_health_endboss.png');
        }
    }


    /**
     * Sets the percentage of the status bar and updates the displayed image based on the percentage.
     * 
     * @param {number} percentage - The percentage to set for the status bar.
     * @param {string[]} arrayForImages - The array of image paths for the status bar.
     */
    setPercentage(percentage, arrayForImages) {
        this.percentage = percentage;
        let path = arrayForImages[this.resolveImageIndex(arrayForImages)];
        this.img = this.imageCache[path];
    }


    /**
     * Sets the percentage of the status bar and updates the displayed image based on the percentage. Uses a different image resolution logic.
     * 
     * @param {number} percentage - The percentage to set for the status bar.
     * @param {string[]} arrayForImages - The array of image paths for the status bar.
     */
    setPercentage2(percentage, arrayForImages) {
        this.percentage = percentage;
        let path = arrayForImages[this.resolveImageIndex2(arrayForImages)];
        this.img = this.imageCache[path];
    }


    /**
     * Sets the status bar image based on the number of objects taken (coins or bottles).
     * 
     * @param {string[]} IMAGES - The array of image paths for the status bar.
     * @param {number} takenObjects - The number of objects taken.
     */
    setIndexForStatusBar(IMAGES, takenObjects) {
        let path = IMAGES[this.resolveImageIndexForStatusBar(takenObjects)];
        if (path) {
            this.img = this.imageCache[path];
        }
    }


    /**
     * Resolves the index of the image to be displayed based on the current percentage.
     * This method is used in setPercentage.
     * 
     * @returns {number} The index of the image in the array.
     */
    resolveImageIndex() {
        if (this.percentage == 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }


    /**
     * Resolves the index of the image to be displayed based on the current percentage.
     * This method is used in setPercentage2.
     * 
     * @returns {number} The index of the image in the array.
     */
    resolveImageIndex2() {
        if (this.percentage == 0 || this.percentage == 10) {
            return 0;
        }

        else if (this.percentage == 20 || this.percentage == 30) {
            return 1;
        }

        else if (this.percentage == 40 || this.percentage == 50) {
            return 2;
        }

        else if (this.percentage == 60 || this.percentage == 70) {
            return 3;
        }

        else if (this.percentage == 80 || this.percentage == 90) {
            return 4;
        }

        else if (this.percentage == 100) {
            return 5;
        }
    }


    /**
     * Resolves the index of the image for the status bar based on the number of taken objects.
     * 
     * @param {number} takenObjects - The number of objects taken.
     * @returns {number} The index of the image in the array.
     */
    resolveImageIndexForStatusBar(takenObjects) {
        if (takenObjects === 0 || takenObjects === 1) {
            return 0;
        }
        else if (takenObjects === 2) {
            return 1;
        }
        else if (takenObjects === 4) {
            return 2;
        }
        else if (takenObjects === 6) {
            return 3;
        }
        else if (takenObjects === 8) {
            return 4;
        }
        else if (takenObjects === 10) {
            return 5;
        }
    }
}


