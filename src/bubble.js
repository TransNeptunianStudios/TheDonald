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
	if(this.sprite)
	    this.sprite.destroy()
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

    create_speach(x, y, text, target) {
	this.reset()
	this.set_position(x, y)
	this.displayText.destroy()
	this.displayText = this.game.add.text(
            this.x, this.y,"",
            {
                font: '18px Verdana',
                backgroundColor: 'rgba(255,255,255,0)',
                wordWrap: true,
                wordWrapWidth: 250
            })
	this.displayText.anchor.setTo(1.0)
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

	if(target)
	    this.colorText(this.displayText, target)

	this.game.world.bringToTop(this.displayText)
    }

    colorText(text, target)
    {
	var saidWords = text.text.split(" ")
	var targetWords = target.split(" ")
	var wordPos = 0

	for (var word in saidWords) {
	    if( saidWords[word] == targetWords[word])
		text.addColor('#336600', wordPos);
	    else
		text.addColor('#FF0000', wordPos);

	    wordPos += saidWords[word].length+1
	}
    }

    create_thought(x, y, words) {
	this.reset()
	this.set_position(x, y)

	this.y = y - 150
	if(this.ori === 'left')
	    this.x = x
	else if(this.ori === 'right')
	    this.x = x + 180

	this.sprite = this.game.add.sprite(this.x-270, 130, 'thought_bubble');
	this.sprite.animations.add('start', [0, 1, 2], 5);
	this.sprite.animations.play('start')

	var wordsOut = []
	this.sprite.animations.currentAnim.onComplete.add(function () {
	    words.forEach((word) => {
		word.runWord(0, 0)
		var tries = 0
		do{
		    var possiblePos = {x: game.rnd.integerInRange(this.sprite.left+60, this.sprite.right-50),
				       y: game.rnd.integerInRange(this.sprite.top+50, this.sprite.bottom-75)}

		    word.text.x = possiblePos.x
		    word.text.y = possiblePos.y

		    var occupied = false
		    wordsOut.forEach((other_word) => {
			var b1 = word.text.getBounds()
			var b2 = other_word.text.getBounds()
			b1.x += word.text.x
			b1.y += word.text.y
			b2.x += other_word.text.x
			b2.y += other_word.text.y
			var test = b1.intersects(b2)
			if(word != other_word && test)
			    occupied = true
		    }, this)
		    tries += 1
		}while( occupied && tries < 100 )
		wordsOut.push(word)
	    }, this)

	}, this);
    }
}
