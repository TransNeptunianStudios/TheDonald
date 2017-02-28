import Phaser from 'phaser'
import Bubble from './bubble'

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

	this.sanity = 1

	this.bubble = new Bubble(this.game, this.x, this.y, true)
    }

    reset() {
	this.bubble.reset()

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
