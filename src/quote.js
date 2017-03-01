import Phaser from 'phaser'
import Word from './word'

export default class Quote {
    constructor(game, asset) {
	this.game = game
	this.sound = game.add.audio(asset)
	this.onQuoteComplete = new Phaser.Signal()
	this.words = []
	this.words_said = []

	// Word table
	//
	// nrOfRows =
	// nrOfColumns =
	// rowWidth =
	// columnWidth =
	//
	// 1. Calculate center position for each cell in the table
	// 2. Store these values in a list
	// 3. "Scrabble" list
	// 4. Pick a position for each word
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

    runQuote() {
	let quoteDuration = 0.0

	// Calculate total duration of quote
	for (var key in this.sound.markers) {
	    quoteDuration += this.sound.markers[key].duration
	}

	this.numberOfWords = this.words.length

	let wordTableSize = Math.floor(this.numberOfWords / 2.0 + 0.5)

	// TODO: Get column width and row height by inspecting word list
	let cells = this.createWordTable(wordTableSize, 150, 50)

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
