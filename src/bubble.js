import Phaser from 'phaser'

export default class Bubble extends Phaser.Group {

    constructor(game, x, y, orientation) {
	super(game)
	this.ori = orientation

	this.graphics = game.add.graphics(x, y)
	this.displayText = this.game.add.text(
            this.x, this.y,"",
            {
                font: '18px Verdana',
                backgroundColor: 'rgba(255,255,255,0)',
                wordWrap: true,
                wordWrapWidth: 250
            })
	this.displayText.anchor.setTo(1.0)
    }

    reset(){
	this.remove()
	this.graphics = this.game.add.graphics(0, 0)
    }

    remove(){
	if(this.graphics)
	    this.graphics.clear()
	this.displayText.text = ""
    }

    set_position(x, y){
	this.y = y - 150
	if(this.ori === 'left')
	    this.x = x
	else if(this.ori === 'right')
	    this.x = x + 180
	this.displayText.x = this.x
	this.displayText.y = this.y
    }

    create_speach(x, y, text) {
	this.reset()
	this.set_position(x, y)

	this.displayText.text = text;
	this.graphics.beginFill(0xFFFFFF)
	var margin = 15
	this.graphics.drawRoundedRect( this.x - this.displayText.width - margin,
				       this.y - this.displayText.height - margin,
				       this.displayText.width + 2*margin,
				       this.displayText.height + 2*margin)
	this.graphics.endFill();


	this.graphics.beginFill(0xFFFFFF)


	if(this.ori === 'left'){
	    this.graphics.moveTo(this.x - this.displayText.width, this.y+10)
	    this.graphics.lineTo(this.x - this.graphics.width/2 + 40,  this.y + 60)
	    this.graphics.lineTo(this.x - this.displayText.width + 35, this.y+10)
	}
	else if (this.ori === 'right'){
	    this.graphics.moveTo(this.x, this.y+10)
	    this.graphics.lineTo(this.x-this.graphics.width/2-30, this.y + 60)
	    this.graphics.lineTo(this.x - 35, this.y + 10)
	}

	this.graphics.endFill();

	this.game.world.bringToTop(this.displayText)
    }

    create_thought(x, y, words) {
	this.reset()
	this.set_position(x, y)

	this.y = y - 150
	if(this.ori === 'left')
	    this.x = x
	else if(this.ori === 'right')
	    this.x = x + 180

	var sprite = this.game.add.sprite(this.x-270, 130, 'thought_bubble');
	sprite.animations.add('start', [0, 1, 2], 5);
	sprite.animations.play('start')
    }
}
