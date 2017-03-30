import Phaser from 'phaser'

export default class extends Phaser.State {
    preload() {
	// preload the loading indicator first before anything else
	//this.load.image('preloaderBar', 'assets/Loading_bar.png')
    }
    create() {
	// set scale options
	this.input.maxPointers = 1
	this.game.scale.scaleMode = Phaser.ScaleManager.USER_SCALE ;
	this.scale.pageAlignHorizontally = true;
	this.scale.pageAlignVertically = true;
	this.scale.forceLandscape = true
	this.scale.refresh()
	this.game.stage.smoothed = false;

	this.game.scale.setResizeCallback(this.gameResized, this);

	// start the Preloader state
	this.state.start('Splash')
    }

    gameResized(manager, bounds)
    {
	var scale = Math.min(window.innerWidth / this.game.width, window.innerHeight / this.game.height);

	manager.setUserScale(scale, scale, 0, 0);
    }
};
