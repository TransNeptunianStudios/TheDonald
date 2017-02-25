import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    preload () {
	// Should these really be here?
	this.load.image('tnsLogo', './assets/images/tns-logo.png')
	this.load.image('playBtn', './assets/images/play-button.png')
	this.load.image('menuBackground', './assets/images/menu-background.png')
	this.load.image('health_frame', './assets/images/Confidence_meter_frame.png')
	this.load.image('thought_bubble', './assets/images/thoughts.png')

	this.load.image('baseCorridor', './assets/images/base-corridor.png')
	this.load.image('office', './assets/images/office.png')

	// Corridor stuff
	this.load.image('elevator', './assets/images/elevator.png')
	this.load.image('elevator-door', './assets/images/elevator-door.png')
	this.load.image('elevator-button', './assets/images/elevator-button.png')

	this.load.image('hanging_lamp', './assets/images/hanging_lamp.png')
	this.load.image('plant', './assets/images/plant.png')

	// KKK corridor
	this.load.spritesheet('kkk_cross', './assets/images/kkk/cross.png', 126, 208)
	this.load.spritesheet('kkk_ladder', './assets/images/kkk/ladder.png', 196, 261)
	this.load.image('kkk_seller', './assets/images/kkk/seller.png')
	this.load.spritesheet('kkk_clansman_2', './assets/images/kkk/clansman_2.png', 80, 123)
	this.load.spritesheet('kkk_kids_and_dog', './assets/images/kkk/kids_and_dog.png', 133,73)
	this.load.spritesheet('kkk_clansman_1', './assets/images/kkk/clansman_1.png', 61, 110)

	this.load.spritesheet('trump', './assets/images/trump.png', 50, 100)
        this.load.spritesheet('trump_game_over', './assets/images/trump_death.png', 50, 150)
	this.load.spritesheet('opponent', './assets/images/pride/vickan.png', 17, 32)

	this.load.audio('suffer', './assets/sounds/i_just_want_them_to_suffer.mp3')
	this.load.audio('noAction', './assets/sounds/too_much_talk_not_enough_action.mp3')
	this.load.audio('elevatorBing', './assets/sounds/elevator_bing.mp3')
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
