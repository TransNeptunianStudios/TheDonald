import Level from './level'

export default class Church extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
    }

    start() {
	super.start()

	this.add_animated_loop('preacher_man', this.game.width/2, 320)
	this.add_sprite('crusifix', this.game.width*0.35, 250)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)
    }
}
