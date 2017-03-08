import Phaser from 'phaser'

export default class Debate {
    constructor (game, trump, opponent, difficulty) {
	this.game = game
	this.trump = trump
	this.opponent = opponent
	this.trumpQuotes = this.trump.getQuotes(difficulty)
	this.onDebateComplete = new Phaser.Signal()
    }

    runDebate (difficulty) {
	if (this.opponent.sanity == 0) {
	    this.opponent.reset()
	    this.onDebateComplete.dispatch()
	    return
	}
	else if(this.trumpQuotes.length == 0){
	    this.trump.game_over()
	    this.onDebateComplete.dispatch()
	    return
	}
	this.opponent.askQuestion();

	this.quote = this.trumpQuotes.pop()

	this.opponent.waitingForAnswer.addOnce((wordsInOrder) => {
	    this.opponent.reset()
	    this.trump.show_thought_bubble()
	    this.trump.thought_bubble.animations.currentAnim.onComplete.addOnce(() => { this.quote.runQuote()}, this)
	}, this)

	this.quote.onQuoteComplete.addOnce((wordsInOrder, actualwords) => {
	    var sentence = actualwords.join(" ")
	    this.trump.remove_thought_bubble()
	    this.opponent.reset()
	    this.trump.talk(sentence)
	    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.evaluate, this, wordsInOrder);
	}, this)
    }

    evaluate(wordsInOrder){
	this.trump.shut_up()
	if (!wordsInOrder)
	{
	    this.trump.decrementConfidence()
	    if ( this.trump.confidence < 1){
		this.trump.game_over();
		return
	    }
	}
	else
	    this.opponent.sanity -= 1

	this.runDebate();
    }
}
