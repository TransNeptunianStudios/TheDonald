import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {
	this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tnsLogo')
	this.logo.anchor.setTo(0.5)
	this.logo.alpha = 0

	// Start fade in of TNS logo
	let fadeInTween = this.game.add.tween(this.logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
	fadeInTween.onComplete.add(()=>{
	    // Wait one second with full alpha
	    this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
		// Start to fade out
		let fadeOutTween = this.game.add.tween(this.logo).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true)
		fadeOutTween.onComplete.add(()=>{
		    this.state.start('MainMenu')
		}, this)
	    }, this)
	})

	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    }
}
