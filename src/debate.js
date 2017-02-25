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
	if (this.trumpQuotes.length == 0) {
	    this.onDebateComplete.dispatch()
	    return
	}

	this.opponent.askQuestion();

	let quote = this.trumpQuotes.pop()

	this.opponent.waitingForAnswer.addOnce((wordsInOrder) => {
	    this.trump.show_thought_bubble()
	    quote.runQuote()
	}, this)

	quote.onQuoteComplete.addOnce((wordsInOrder) => {
	    this.trump.remove_thought_bubble()
	    this.opponent.reset()

	    if (!wordsInOrder)
	    {
		this.trump.decrementConfidence()
	    }

	    this.runDebate();
	})

    }
}
