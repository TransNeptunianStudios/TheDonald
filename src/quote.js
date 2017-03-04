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

    // size = nr of rows and columns
    createWordTable(size, columnWidth, rowHeight) {
	let cx = this.game.world.centerX - (size * columnWidth / 2.0)
	let cy = this.game.world.centerY - (size * rowHeight / 2.0)

	let cells = []

	for (let i = 0; i < size; i++) {
	    for (let j = 0; j < size; j++) {
		cells.push({x: cx + (i * columnWidth),
			    y: cy + (j * rowHeight)})
	    }
	}
	return cells
    }

    addWord(word, start, duration) {
	this.sound.addMarker(word, start, duration)
	this.words.push(new Word(this.game, word))
    }

    addSimpleSentence(sentence) {
	sentence.forEach((word) => {
	    this.words.push(new Word(this.game, word))
	}, this)
    }

    runQuote() {
	let quoteDuration = 0.0

	// Calculate total duration of quote
	//for (var key in this.sound.markers) {
	//    quoteDuration += this.sound.markers[key].duration
	//}

	this.numberOfWords = this.words.length

	let wordTableSize = Math.floor(this.numberOfWords / 2.0+ 0.5)

	// TODO: Get column width and row height by inspecting word list
	let cells = this.createWordTable(wordTableSize, 80, 30)

	cells = Phaser.ArrayUtils.shuffle(cells)

	// Reverse the array so that we can pop the first word of the quote
	this.words.reverse()

	let wordsInOrder = true

	this.words.forEach((word) => {

	    word.onWordPressed.add(() => {
		this.words_said.push(word)
		//this.sound.play(word.word)

		let correctWord = this.words.pop()
		if (correctWord.word != word.word) {
		    wordsInOrder = false
		}

		this.numberOfWords -= 1

		if (this.numberOfWords == 0) {
		    this.onQuoteComplete.dispatch(wordsInOrder)
		}
	    }, this)

	    let position = cells.pop()

	    word.runWord(position.x, position.y)
	})
    }
}
