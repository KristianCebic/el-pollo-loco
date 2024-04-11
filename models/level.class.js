/**
 * Represents a level in a game, including various elements like enemies, clouds, background objects, coins, and bottles.
 * This class stores the different components that make up a game level. It also keeps track of the end position of the level on the x-axis.
 * level_end_x: The x-coordinate marking the end of the level. Default value is 2613.
 */
class Level {
    enemies;
    clouds;
    backgroundObjects;
    coins;
    bottles;
    level_end_x = 2613;

    
    constructor(enemies, clouds, backgroundObjects, coins, bottles){
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}