import Level from './level'

export default class kkkMeeting extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
    }

    start() {
	super.start()

	this.add_animated_loop('kkk_cross', this.game.width/2+45, 320)
	this.add_animated_loop('kkk_clansman_2', this.game.width/2-10, 370, 10, [0, 1])
	this.add_animated_loop('kkk_ladder', 125, 220, 1)
	this.add_sprite('kkk_seller', 650, 320)
	this.add_sprite('kkk_kid_dog', 270, 330)
	this.add_sprite('kkk_clansman_3', 555, 340)
	this.add_sprite('kkk_clansman_1', 335, 330)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)
    }
}
