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

	// this.add_animated_loop('kkk_cross', this.game.width/2+45, 320)
	// this.add_animated_loop('kkk_clansman_2', this.game.width/2-10, 370, 10, [0, 1])
	// this.add_animated_loop('kkk_ladder', 125, 220, 1)
	this.add_sprite('eid_flag', 450, 220)
	// this.add_animated_loop('kkk_kids_and_dog', 270, 330)
	// this.add_animated_loop('kkk_clansman_1', 555, 330)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)
    }
}
