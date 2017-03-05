import Phaser from 'phaser'
import Bubble from './bubble'

export default class Opponent extends Phaser.Sprite {
    constructor(game, opponent) {
	super(game, 500, 445, opponent)
	this.anchor.setTo(0.5, 1);

	this.waitingForAnswer = new Phaser.Signal()

	this.frame = 0
	this.animations.add('talk', [1, 2, 3, 4], 10, true)
	this.animations.add('collapse', [5, 6, 7], 10, true)

	this.sanity = 2

	this.bubble = new Bubble(this.game, this.x, this.y, 'right')
    }

    reset() {
	this.bubble.remove()

	if(this.sanity == 0)
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
                             "Do you like Putin?",
			     "Can you read?"]
	allQuestions = Phaser.ArrayUtils.shuffle(allQuestions);

	let question = "...what?"
	if(allQuestions.length > 0)
	    question = allQuestions.pop()

	this.animations.play('talk')

	this.bubble.create_speach(question)

	// Ask question for 2 seconds
	this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
	    this.animations.stop();
	    this.frame = 0
	    this.waitingForAnswer.dispatch()
	}, this)
    }
}
