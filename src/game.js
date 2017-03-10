/* globals __DEV__ */
import Phaser from 'phaser'
import Trump from './trump'
import PrideParty from './prideparty'
import kkkMeeting from './kkkmeeting'
import Science from './science'
import EidParty from './eidparty'
import Church from './church'

export default class extends Phaser.State {
    init () {}

    preload () {}

    create () {

	this.trump = new Trump(this.game)
	this.trump.onDead.addOnce(this.showRetryButton, this)

	// 1. Create list with all corridors
	// 2. Run lobby scene
	// 3. Pick a corridor
	// 4. Start corridor scene
	// 5. Wait for corridor scene to complete
	// 6. Pick new corridor
	// 7. IF more corridors Goto 4 ELSE Goto 8
	// 8. Run final scene

	this.levels = []
	// this.levels.push(new PrideParty(this.game, this.trump))
	// this.levels.push(new kkkMeeting(this.game, this.trump))
	// this.levels.push(new Science(this.game, this.trump))
	this.levels.push(new Church(this.game, this.trump))
	// this.levels.push(new EidParty(this.game, this.trump))
	this.nextLevel()
    }

    nextLevel () {
	if (this.levels.length > 0) {
	    this.level = this.levels.pop()

	    this.level.onLevelComplete.addOnce(()=>{
		this.nextLevel()
	    })

	    this.level.start()
	}
	else {
            this.state.start('GameOverMenu')
	}
    }

    showRetryButton() {
	this.retryBtn = this.game.add.button(this.game.world.centerX,
					     this.game.world.centerY,
					     'retry_button',
					     this.returnToMenu,
					     this,
					     0,
					     1,
					     2);
	this.retryBtn.anchor.setTo(0.5)

    }

    returnToMenu() {
	this.state.start('MainMenu');
    }

    update () {
	if(this.level)
	    this.level.update();
    }
}
