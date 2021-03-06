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
	this.hurt_sound = game.add.audio('hurt')

	this.sanity = 2
	this.questions = [ "What do you think about the middle-east?",
                           "Are you a feminist?",
                           "Do you approve of torture?!",
                           "What will you do about global warming?",
                           "Did you support the war in Iraq?",
                           "Was Obama born in America?",
                           "How will America be great again?",
                           "What do you think about immigration?",
                           "How big are your hands?",
                           "Will you really jail Hillary?",
                           "Do you think Putin is a great leader?",
			   "What will you do about hate-crimes?",
			   "How will you replace the affordable health care act?",
			   "Will you release your tax reports?",
			   "Should we use more nukes?"]

	Phaser.ArrayUtils.shuffle(this.questions);

	this.bubble = new Bubble(this.game, this.x, this.y, 'right')
    }

    reset() {
	this.bubble.remove()

	if(this.sanity == 0)
	    this.animations.play('collapse')
    }

    confuse() {
	var hurttween = this.game.add.tween(this).to({y: '-5'}, 20, Phaser.Easing.Linear.None, true, 0, 3, true);
	this.hurt_sound.play()
	this.sanity -= 1
    }

    askQuestion(){
	let question = "...what?"
	if(this.questions.length > 0)
	    question = this.questions.pop()

	this.animations.play('talk')

	this.bubble.create_speach(this.x, this.y, question)

	// Ask question for 2 seconds
	this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
	    this.animations.stop();
	    this.frame = 0
	    this.waitingForAnswer.dispatch()
	}, this)
    }
}
