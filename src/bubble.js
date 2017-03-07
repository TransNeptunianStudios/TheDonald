import Phaser from 'phaser'

export default class Bubble extends Phaser.Group {

    constructor(game, x, y, orientation) {
	super(game)
	this.ori = orientation
	this.y = y - 150
	if(this.ori === 'left')
	    this.x = x -180
	else if(this.ori === 'right')
	    this.x = x + 180

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

    create_speach(text) {
	this.reset()
	this.displayText.text = text;
	this.graphics.beginFill(0xFFFFFF)
	var margin = 15
	this.graphics.drawRoundedRect( this.x - this.displayText.width - margin,
				       this.y - this.displayText.height - margin,
				       this.displayText.width + 2*margin,
				       this.displayText.height + 2*margin)
	this.graphics.endFill();


	this.graphics.beginFill(0xFFFFFF)
	this.graphics.moveTo(this.x-15, this.y )

	if(this.ori === 'left')
	    this.graphics.lineTo(this.x+this.displayText.width/2, this.y + 40)
	else if (this.ori === 'right')
	    this.graphics.lineTo(this.x-this.displayText.width/2, this.y + 40)

	this.graphics.lineTo(this.x+15, this.y)
	this.graphics.endFill();

	this.game.world.bringToTop(this.displayText)
    }

    create_thought(text) {
	this.reset()
	var sprite = this.create(this.x, this.y, 'thought_bubble');
    }
}
