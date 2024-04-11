/**
 * Instance of Level class representing the first level of the game.
 * It includes arrays of various game objects such as chickens, clouds, background objects, coins, and bottles.
 * 
 * - Chickens: Includes both regular and small chickens as enemies.
 * - Clouds: Positioned at different points to enhance the background.
 * - Background Objects: Multiple layers of background objects to create a parallax effect.
 * - Coins: Placed at specific points for the character to collect.
 * - Bottles: Randomly positioned bottles that can be collected.
 */
const level1 = new Level(

    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Smallchicken(),
        new Endboss(),
    ],

    [
        new Cloud(500),
        new Cloud(1000),
        new Cloud(1500),
        new Cloud(2000),
        new Cloud(2500),
    ],

    [
        new BackgroundObject('img/5_background/layers/air.png', -719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 719),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 5),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 5),

        new BackgroundObject('img/5_background/layers/air.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 6),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 6),
    ],

    [
        new Coin(800, 150),
        new Coin(700, 150),
        new Coin(1100, 140),
        new Coin(1200, 120),
        new Coin(1300, 130),
        new Coin(1400, 150),
        new Coin(1600, 200),
        new Coin(1620, 160),
        new Coin(1900, 140),
        new Coin(2413, 160),
    ],

    [
        new Bottle(Math.random() * 500 + 200),
        new Bottle(Math.random() * 500 + 200),
        new Bottle(Math.random() * 500 + 200),
        new Bottle(Math.random() * 800 + (500)),
        new Bottle(Math.random() * 800 + (500)),
        new Bottle(Math.random() * 800 + (500)),
        new Bottle(Math.random() * 1200 + (800)),
        new Bottle(Math.random() * 1200 + (800)),
        new Bottle(Math.random() * 1200 + (800)),
        new Bottle(Math.random() * 1200 + (800)),

        new Bottle(Math.random() * 1200 + (1100)),
        new Bottle(Math.random() * 1200 + (1100)),
        new Bottle(Math.random() * 1200 + (1100)),
    ],
);