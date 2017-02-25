import Phaser from 'phaser'
import Quote from './quote'
import HealthBar from './healthbar.js'

export default class Trump extends Phaser.Sprite {
    constructor(game) {
	super(game, 0, 0, 'trump')
	this.anchor.setTo(0.5, 1);

	this.frame = 2;
	this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);

	this.onCallingElevator = new Phaser.Signal()
	this.onReadyForDebate = new Phaser.Signal()
	this.walkTween = this.game.add.tween(this);

	this.healthbar = new HealthBar(this.game, {x: this.game.world.centerX, y: 40, width: 182, height: 32, bgImage: 'health_frame'})

	this.confidence = 100

	this.createQuotes()
    }

    game_over(){
	this.loadTexture('trump_game_over', 0);
	this.animations.add('explode');
	this.animations.add('fissle', [31, 32, 33, 34])
	this.animations.play('explode', 10);

	this.events.onAnimationComplete.add(function(){
	    this.play('fissle', 10, true)
	}, this);
    }

    // Initialize Trump for a new level
    initLevel(point) {
	this.frame = 2
	this.position.setTo(point.x, point.y - 10)
	this.healthbar.draw()
    }

    // walks trump in a direction with the animation running
    walkDirection(dx, dy){
	let time = Math.max(Math.abs(dx), Math.abs(dy))*7.5;

	this.walkTween = this.game.add.tween(this).to({x: this.x+dx,y: this.y+dy}, time, Phaser.Easing.Linear.None, true);
	this.walkTween.onComplete.add(()=>{this.animations.stop()}, this)

	if( dx == 0 && dy == 0 ) this.animations.stop()
	else if( dx > 0 ) this.animations.play('east')
	else if( dy > 0 ) this.animations.play('south')
	else if( dx < 0 ) this.animations.play('west')
	else if( dy < 0 ) this.animations.play('north')

	return this.walkTween;
    }

    createQuotes () {
	this.quotes = []

	let suffer = new Quote(game, 'suffer')
	suffer.addWord('i', 0.0, 0.35)
	suffer.addWord('just', 0.35, 0.30)
	suffer.addWord('want', 0.65, 0.25)
	suffer.addWord('them', 0.90, 0.20)
	suffer.addWord('to', 1.10, 0.25)
	suffer.addWord('suffer', 1.35, 0.65)
	this.quotes.push(suffer)

	let noAction = new Quote(game, 'noAction')
	noAction.addWord('to', 0.0, 0.25)
	noAction.addWord('much', 0.20, 0.35)
	noAction.addWord('talk', 0.6, 0.5)
	noAction.addWord('not', 1.30, 0.22)
	noAction.addWord('enough', 1.55, 0.20)
	noAction.addWord('action', 1.75, 0.4)
	this.quotes.push(noAction)
    }

    show_thought_bubble(){
	this.bubble = this.game.add.sprite(140, 120, 'thought_bubble')
    }

    remove_thought_bubble(){
	this.bubble.destroy()
    }

    getQuotes (difficulty) {
	// TODO: Add more quotes and sort with difficulties
	return this.quotes
    }

    incrementConfidence () {
	//this.confidence += 10
	this.healthbar.setPercent(this.confidence);
    }

    decrementConfidence () {
	this.confidence -= 50
	this.healthbar.setPercent(this.confidence);
    }

    // walks from elevator to elevator
    doFullWalk() {
	this.walkDirection(0, 120).onComplete.addOnce(()=>{
	    this.walkDirection(690, 0).onComplete.addOnce(()=>{
		this.walkDirection(0, -90).onComplete.addOnce(()=>{
		    this.onCallingElevator.dispatch();
		}, this)
	    }, this)
	}, this)
    }

    // walks from elevator to level middle
    doDebateWalk() {
	this.walkDirection(0, 120).onComplete.addOnce(()=>{
	    this.walkDirection(345, 0).onComplete.addOnce(()=>{
		this.onReadyForDebate.dispatch();
	    }, this)
	}, this)
    }

    // walks from middle to end elevator
    doRestOfWalk() {
	this.walkDirection(345, 0).onComplete.addOnce(()=>{
	    this.walkDirection(0, -90).onComplete.addOnce(()=>{
		this.onCallingElevator.dispatch();
	    }, this)
	}, this)
    }
}
