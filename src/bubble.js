import Phaser from 'phaser'

export default class Bubble extends Phaser.Group {

    constructor(game, x, y, flipped = false) {
	super(game)
	this.x = x + 60
	this.y = y - 140
	this.graphics = game.add.graphics(x, y)
	this.displayText = this.game.add.text(
            this.x, this.y,"",
            {
                font: '18px Verdana',
                backgroundColor: 'rgba(255,255,255,0)',
                wordWrap: true,
                wordWrapWidth: 250
            })
    }

    reset(){
	if(this.graphics)
	    this.graphics.clear()
	this.graphics = this.game.add.graphics(0, 0)
	this.displayText.text = ""
    }

    create_speach(text) {
	this.reset()
	this.displayText.text = text;
	this.graphics.beginFill(0xFFFFFF)
	this.graphics.drawRoundedRect( this.x - 10,
				       this.y - 10,
				       this.displayText.width+20,
				       this.displayText.height+10)
	this.graphics.endFill();

	this.graphics.beginFill(0xFFFFFF)
	this.graphics.moveTo(this.x + 10, this.y + this.displayText.height)
	this.graphics.lineTo(this.x - 15, this.y + this.displayText.height+50)
	this.graphics.lineTo(this.x + 25, this.y + this.displayText.height)
	this.graphics.endFill();

	this.game.world.bringToTop(this.displayText)
    }

    create_thought(text) {
	this.reset()
	var sprite = this.create(this.x, this.y, 'thought_bubble');
    }
}
