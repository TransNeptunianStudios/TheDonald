import Level from './level'
import Opponent from './opponent'

export default class Science extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
	this.opponent = new Opponent(game, 'science_main');
    }

    doWalk() {
	this.trump.doDebateWalk();
	this.trump.onReadyForDebate.addOnce(()=>{
	    this.startDebate()
	}, this)
    }

    start() {
	super.start()

	this.add_animated_loop('science_ape', 270, 330, 3)

	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)
    }
}
