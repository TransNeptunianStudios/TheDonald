import Phaser from 'phaser'
import Elevator from './elevator'
import Trump from './trump'
import Debate from './debate'

export default class Level {
    constructor(game, trump) {
	this.game = game
	this.trump = trump
	this.background = 'baseCorridor'
	this.onLevelComplete = new Phaser.Signal()
    }

    add_sprite(key, x, y) {
	var s = this.midGroup.create(x, y, key)
	s.anchor.setTo(0.5)
    }

    add_animated_loop(key, x, y, f = 10, frames = []) {
	var s = this.midGroup.create(x, y, key)
	s.anchor.setTo(0.5)

	if ( frames.length == 0)
	    s.animations.add('loop_animation')
	else
	    s.animations.add('loop_animation', frames)

	s.animations.play('loop_animation', f, true)

    }

    start() {
	// backgroup for all background stuff
	// midgroup is above and z-ordered
	this.backGroup = this.game.add.group()
	this.midGroup = this.game.add.group()
	this.backGroup.create(0, 0, this.background)

	this.inElevator = new Elevator(game, 80, 341, this.backGroup, this.midGroup)
	this.outElevator = new Elevator(game, this.game.width-80, 341, this.backGroup, this.midGroup)

	this.trump.initLevel(this.inElevator.position)

	// trump and possible opponent added
	this.midGroup.add(this.trump)
	if(this.opponent)
	    this.midGroup.add(this.opponent)

	// When trump is calling an elevator, open it and walk trump
	// into it. When door closed, start fade, then lvl complete
	this.trump.onCallingElevator.addOnce(()=>{
	    this.outElevator.open();
	    this.outElevator.onDoorOpen.addOnce(()=>{
		this.trump.walkDirection(0, -30);
	    }, this)
	    this.outElevator.onDoorClose.addOnce(()=>{
		this.game.camera.fade('#000000');
		this.game.camera.onFadeComplete.addOnce(()=>{
		    this.onLevelComplete.dispatch()
		}, this)
	    }, this)
	})

	this.inElevator.onDoorOpen.addOnce(()=>{
	    this.doWalk()
	})

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.inElevator.open();
	}, this)

	this.game.camera.flash('#000000')
    }

    startDebate(difficulty) {
	let debate = new Debate(this.game, this.trump, this.opponent, difficulty)
	debate.onDebateComplete.addOnce(()=>{
	    this.trump.doRestOfWalk()
	}, this)
	debate.runDebate()
    }

    doWalk() {
	this.trump.doFullWalk()
    }

    update() {
	this.midGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }
}
