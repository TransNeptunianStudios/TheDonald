import Phaser from 'phaser'
import Word from './word'

export default class Quote {
    constructor(game, sentence, asset) {
	this.game = game
	this.onQuoteComplete = new Phaser.Signal()
	this.words = []
	this.words_said = []

	if (sentence)
	    this.addSimpleSentence(sentence)

	if(asset)
	    this.sound = game.add.audio(asset)
    }

    addSimpleSentence(sentence) {
	sentence.forEach((word) => {
	    this.words.push(new Word(this.game, word))
	}, this)
    }

    remove() {
	this.words.forEach((word) => {
	    word.remove()
	}, this)
    }

    runQuote() {
	let quoteDuration = 0.0

	// Reverse the array so that we can pop the first word of the quote
	this.words.reverse()
	this.actual = []

	let wordsInOrder = true
	this.numberOfWords = this.words.length
	this.words.forEach((word) => {
	    this.actual.unshift(word.word)
	    word.onWordPressed.add(() => {
		this.words_said.push(word.word)
		this.numberOfWords -= 1
		if (this.numberOfWords == 0) {
		    this.onQuoteComplete.dispatch(this.words_said, this.actual)
		}
	    }, this)
	})
	return this.words
    }
}
