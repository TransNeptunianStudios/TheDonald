import Phaser from 'phaser'
import Word from './word'

export default class Quote {
  constructor(game, asset) {
    this.game = game
    this.sound = game.add.audio(asset)
    this.onQuoteComplete = new Phaser.Signal()
    this.words = []
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

    // Reverse the array so that we can pop the first word of the quote
    this.words.reverse()

    let wordsInOrder = true

    this.words.forEach((word) => {

      word.onWordPressed.add(() => {

        this.sound.play(word.word)

        let correctWord = this.words.pop()

        if (correctWord.word != word.word) {
          wordsInOrder = false
        }

        this.numberOfWords -= 1

        if (this.numberOfWords == 0) {
          this.onQuoteComplete.dispatch(wordsInOrder)
        }
      })

      word.runWord()
    })
  }
}