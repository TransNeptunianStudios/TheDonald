import Phaser from 'phaser'

export default class Opponent extends Phaser.Sprite {
    constructor(game) {
	super(game, 500, 445, 'opponent')
	this.anchor.setTo(0.5, 1);

	this.waitingForAnswer = new Phaser.Signal()

	// while we use vickan graphics
	this.scale.setTo(2.5, 2.5)
	this.frame = 0
	this.animations.add('talk', [0, 1], 10, true)
	this.animations.add('collapse', [2, 3], 10, true)

	this.graphics = this.game.add.graphics(0, 0)
	this.sanity = 1
    }

    reset() {
	if (this.displayText) {
	    this.displayText.destroy()
	    this.graphics.clear();
	}
	if(this.sanity < 1)
	    this.animations.play('collapse')
    }

    askQuestion(){
	let allQuestions = [ "What do you think about the midle-east?",
                             "Are you a feminist?",
                             "Do you approve of torture?!",
                             "What will you do about global waming?",
                             "Did you support the war in iraq?",
                             "Was Obama born in America?",
                             "How will America be great again?",
                             "Do you belive mexicans are rapists?!",
                             "How big are your hands?",
                             "Will you really jail Hillary?",
                             "Do you like Putin?"]
	allQuestions = Phaser.ArrayUtils.shuffle(allQuestions);

	let question = "...what?"
	if(allQuestions.length > 0)
	    question = allQuestions.pop()

	let pos = new Phaser.Point(this.x + 60, this.y - 140 );
	this.displayText = this.game.add.text(
            pos.x, pos.y,
            question,
            {
                font: '18px Verdana',
                backgroundColor: 'rgba(255,255,255,0)',
                wordWrap: true,
                wordWrapWidth: 250
            })

	this.graphics.clear();
	this.graphics = this.game.add.graphics(0, 0)
	this.graphics.beginFill(0xFFFFFF)
	this.graphics.drawRoundedRect( pos.x - 10,
				       pos.y - 10,
				       this.displayText.width+20,
				       this.displayText.height+10)
	this.graphics.endFill();

	this.graphics.beginFill(0xFFFFFF)
	this.graphics.moveTo(pos.x + 10, pos.y + this.displayText.height)
	this.graphics.lineTo(pos.x - 15, pos.y + this.displayText.height+50)
	this.graphics.lineTo(pos.x + 25, pos.y + this.displayText.height)
	this.graphics.endFill();

	this.game.world.bringToTop(this.displayText)
	this.animations.play('talk')

	// Ask question for 2 seconds
	this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
	    this.animations.stop();
	    this.frame = 0
	    this.waitingForAnswer.dispatch()
	}, this)
    }
}
