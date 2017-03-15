import Level from './level'
import Opponent from './opponent'

export default class PrideParty extends Level {
    constructor(game, trump) {
	super(game, trump)
	this.background = 'baseCorridor'
	this.opponent = new Opponent(game, 'pride_main');
    }

    doWalk() {
	this.trump.doDebateWalk();
	this.trump.onReadyForDebate.addOnce(()=>{
	    this.startDebate()
	}, this)
    }

    start() {
	super.start()
	this.add_sprite('hanging_lamp', this.game.width*0.3, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.5, 50)
	this.add_sprite('hanging_lamp', this.game.width*0.7, 50)

	this.add_sprite('pride_flag', 350, 200)
	this.add_sprite('pride_symbol', 200, 200)

	this.kaj = this.backGroup.create(250, 350, 'pride_kaj')
	this.kaj.animations.add('loop_animation')
	this.game.time.events.loop(Phaser.Timer.SECOND*3, this.updateKaj, this)
    }

    updateKaj(){
	this.kaj.animations.play('loop_animation', 20)
    }
}
