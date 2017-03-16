import Level from './level'

export default class Church extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
    }

    start() {
	super.start()

	this.add_animated_loop('preacher_man', this.game.width/2+100, 375)
	this.add_animated_loop('podium', this.game.width/2, 270)
	this.add_sprite('crusifix', this.game.width*0.5, 150)
	this.add_sprite('church_guests', this.game.width*0.5, 350)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)

	this.add_sprite('plant', this.game.width*0.2, 320)
	this.add_sprite('plant', this.game.width*0.8, 320)
    }
}
