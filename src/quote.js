import Phaser from 'phaser'
import Word from './word'

export default class Quote {
  constructor (game, asset) {
    this.game = game
    this.sound = game.add.audio(asset)
    this.onQuoteComplete = new Phaser.Signal()
    this.words = []
  }

  addWord(word, start, duration) {
    this.sound.addMarker(word, start, duration)
    this.words.push(new Word(this.game, this.sound, word))
  }

  runQuote() {
    let word = this.words.pop()

    word.onWordComplete.add(() => {
      this.onQuoteComplete.dispatch()
    })

    word.runWord()
  }
}
