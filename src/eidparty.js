import Level from './level'
import Opponent from './opponent'

export default class EidParty extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
	this.opponent = new Opponent(game, 'eid_main');
    }

    doWalk() {
	this.trump.doDebateWalk();
	this.trump.onReadyForDebate.addOnce(()=>{
	    this.startDebate()
	}, this)
    }


    start() {
	super.start()

	this.add_sprite('eid_flag', 450, 220)
	this.add_sprite('eid_food', 320, 320)
	this.add_sprite('eid_food2', 570, 350)

	this.add_sprite('eid_guest1', 300, 375)
	this.add_animated_loop('eid_guest2', 360, 370, 20)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)

	this.add_sprite('plant', this.game.width*0.2, 320)
	this.add_sprite('plant', this.game.width*0.80, 320)
    }
}
