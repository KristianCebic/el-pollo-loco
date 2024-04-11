/**
 * In this class are functions for User Interface.
 */
class WorldUI {
    worldGameLogic;

    constructor (worldGameLogic) {
        this.worldGameLogic = worldGameLogic
    }


    /**
    * Displays the start screen of the game.
    */
    displayStartScreen() {
        this.worldGameLogic.startScreen.img.onload = () => {
            this.worldGameLogic.startScreen.draw(this.worldGameLogic.ctx);
        }
    }


    /**
    * Displays the congratulations screen.
    */
    showCongratulations() {
        this.worldGameLogic.stopGame();
        this.worldGameLogic.playOneTime++;
        if (this.worldGameLogic.playOneTime == 1 && this.worldGameLogic.musicPlays) {
            this.playAudio(this.worldGameLogic.music.congratulations)
        }
        this.worldGameLogic.ctx.clearRect(0, 0, this.worldGameLogic.canvas.width, this.worldGameLogic.canvas.height);
        this.worldGameLogic.addToMap(this.worldGameLogic.congratulations);
        let playAgainButton = document.getElementById('playAgain');
        playAgainButton.style.display = 'flex';
        document.getElementById('speakerOn').style.display = 'none'
        document.getElementById('speakerOff').style.display = 'none'
        document.getElementById('gamePad2').style.display = 'none'
        document.getElementById('containerForButtons').style.display = 'none'
    }


    /**
    * Displays information about the game.
    */
    showInfoAboutGame() {
        document.getElementById('parentDivOfInfo').style.display = 'flex'
        document.getElementById('infoDiv').style.display = 'flex'
    }


    /**
    * Shows movement instructions.
    */
    showMovementInstructions() {
        document.getElementById('parentDivOfInstructions').style.display = 'flex'
    }


    /**
    * Toggles the display of in-game movement instructions.
    */
    showMovementInstructionsInTheGame() {
        if (this.worldGameLogic.howToPlayWindowOpen) {
            document.getElementById('instructions2').style.display = 'none'
            this.worldGameLogic.howToPlayWindowOpen = false
        } else {
            document.getElementById('instructions2').style.display = 'flex'
            this.worldGameLogic.howToPlayWindowOpen = true
        }
    }


    /**
    * Plays an audio source.
    * 
    * @param {Audio} source - The audio source to be played.
    */
    playAudio(source) {
        var playAudioPromise = source.play();
        if (playAudioPromise !== undefined) {
            playAudioPromise.then(_ => {
            })
                .catch(error => {
                    console.error("Fehler bei der Wiedergabe: ", error);
                });
        } else {
            console.log("Automatische Wiedergabe wird nicht unterstützt.");
        }
    }


    /**
    * Turns off the game speaker, pausing the background music.
    */
    turnSpeakerOff() {
        this.worldGameLogic.worldGameLogic.musicPlays = false
        this.worldGameLogic.music.backgroundMusic.pause()
        document.getElementById('speakerOn').style.display = 'none'
        document.getElementById('speakerOff').style.display = 'flex'
    }


    /**
    * Turns on the game speaker, resuming the background music.
    */
    turnSpeakerOn() {
        this.worldGameLogic.musicPlays = true
        this.worldGameLogic.music.backgroundMusic.play()
        document.getElementById('speakerOn').style.display = 'flex'
        document.getElementById('speakerOff').style.display = 'none'
    }


    /**
      * Draws the game world and all its components on the canvas.
    */
    draw() {
        this.worldGameLogic.ctx.clearRect(0, 0, this.worldGameLogic.canvas.width, this.worldGameLogic.canvas.height);

        this.worldGameLogic.ctx.translate(this.worldGameLogic.camera_x, 0);

        this.worldGameLogic.addObjectsToMap(this.worldGameLogic.level.backgroundObjects);
        this.worldGameLogic.addObjectsToMap(this.worldGameLogic.level.clouds);
        this.worldGameLogic.addObjectsToMap(this.worldGameLogic.throwableObjects);
        this.worldGameLogic.addObjectsToMap(this.worldGameLogic.level.coins);
        this.worldGameLogic.addObjectsToMap(this.worldGameLogic.level.bottles);
        if (this.worldGameLogic.gameIsRunning) {
            this.worldGameLogic.addObjectsToMap(this.worldGameLogic.level.enemies);
        }

        this.worldGameLogic.ctx.translate(-this.worldGameLogic.camera_x, 0);

        this.worldGameLogic.addToMap(this.worldGameLogic.statusBar.bottleStatusBar);
        this.worldGameLogic.addToMap(this.worldGameLogic.statusBar.healthStatusBar);
        this.worldGameLogic.addToMap(this.worldGameLogic.statusBar.coinStatusBar);
        this.worldGameLogic.addToMap(this.worldGameLogic.statusBar.bossChickenHealth);
        this.worldGameLogic.statusBar.hearthFromBossChicken.height = 67;
        this.worldGameLogic.statusBar.hearthFromBossChicken.width = 67;
        this.worldGameLogic.addToMap(this.worldGameLogic.statusBar.hearthFromBossChicken);

        this.worldGameLogic.ctx.translate(this.worldGameLogic.camera_x, 0);

        this.worldGameLogic.addToMap(this.worldGameLogic.character);

        this.worldGameLogic.ctx.translate(-this.worldGameLogic.camera_x, 0);
        if (this.worldGameLogic.character.isDead()) {
            this.worldGameLogic.gameOver();
        }
        else if (this.worldGameLogic.showCongratulationsScreen) {
            this.showCongratulations();
        }
        else if (this.worldGameLogic.character.x + this.worldGameLogic.character.offset.left > this.worldGameLogic.endBoss.x + this.worldGameLogic.endBoss.width - this.worldGameLogic.endBoss.offset.right) {
            this.worldGameLogic.character.cameraIndex += (500 - this.worldGameLogic.character.cameraIndex) * 0.01;
        } else {
            this.worldGameLogic.character.cameraIndex += (100 - this.worldGameLogic.character.cameraIndex) * 0.01;
        }

        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }


    /**
    * Flips the image of a DrawableObject horizontally.
    * 
    * @param {DrawableObject} mo - The DrawableObject whose image is to be flipped.
    */
    flipImage(mo) {
        this.worldGameLogic.ctx.save();
        this.worldGameLogic.ctx.translate(mo.width, 0);
        this.worldGameLogic.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }


    /**
    * Flips the image of a DrawableObject back to its original orientation.
    * 
    * @param {DrawableObject} mo - The DrawableObject whose image is to be flipped back.
    */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.worldGameLogic.ctx.restore();
    }


    /**
    * Checks if the title should be displayed based on the window size.
    */
    checkIfShowTitel() {
        if (window.innerWidth <= 933 && window.innerHeight <= 431) {
            document.getElementById('titel').style.display = 'none'
        }
    }


    
}