import Phaser from 'phaser'
import Timer from './timer.js'

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
	    var words = this.quote.runQuote()
	    this.trump.show_thought_bubble(words)
	    this.timer = new Timer(this.game)
	    this.game.add.existing(this.timer)
	    this.timer.onTimeOut.addOnce(() => {
		this.trump.remove_thought_bubble()
		this.opponent.reset()
		this.quote.remove()
		this.timer.destroy()
		this.evaluate(false)
	    }, this)
	}, this)

	this.quote.onQuoteComplete.addOnce((wordsInOrder, actualwords, targetWords) => {
	    this.timer.onTimeOut.dispose()
	    this.timer.destroy()
	    var sentence = actualwords.join(" ")
	    var target = targetWords.join(" ")
	    this.trump.remove_thought_bubble()
	    this.opponent.reset()
	    this.trump.talk(sentence, target)
	    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.evaluate, this, wordsInOrder, actualwords);
	}, this)
    }

    evaluate(wordsInOrder, actualwords){
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
	    this.opponent.confuse()

	this.game.time.events.add(Phaser.Timer.SECOND * 2, this.runDebate, this);
    }
}
