import Phaser from 'phaser'

export default class Trump extends Phaser.Sprite {
    constructor(game, x, y) {
	super(game, x, y, 'minitrump')
	this.anchor.setTo(0.5, 1);

	this.frame = 2;
	this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
	this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
	this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
	this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);
	this.animations.add('dance', [36, 37], 15, true);
    }
    
    // walks trump in a direction with the animation running
    runTo(x, y, time){	
	var runTween = this.game.add.tween(this).to({x: x, y: y}, time, Phaser.Easing.Linear.None, true);
	runTween.onComplete.add(()=>{this.animations.play('dance')}, this)

	var dx = x - this.x
	var dy = y - this.y

	if ( Math.abs(dx) > Math.abs(dy))
	    dy = 0
	else
	    dx = 0
	
	if( dx == 0 && dy == 0 ) this.animations.stop()
	else if( dx > 0 ) this.animations.play('east')
	else if( dy > 0 ) this.animations.play('south')
	else if( dx < 0 ) this.animations.play('west')
	else if( dy < 0 ) this.animations.play('north')
	
	return runTween
    }
}
