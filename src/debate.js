import Phaser from 'phaser'
import Quote from './quote'

export default class Debate {
  constructor (game, trumpQuotes, opponentQuotes) {
    this.game = game
    this.trumpQuotes = trumpQuotes
    this.opponentQuotes = opponentQuotes
    this.onDebateComplete = new Phaser.Signal()

    this.quote = new Quote(game, 'suffer')
    this.quote.addWord('i', 0.0, 0.35)
    this.quote.addWord('just', 0.35, 0.30)
    this.quote.addWord('want', 0.65, 0.25)
    this.quote.addWord('them', 0.90, 0.20)
    this.quote.addWord('to', 1.10, 0.25)
    this.quote.addWord('suffer', 1.35, 0.65)
    this.quote.onQuoteComplete.add(() => {
      this.onDebateComplete.dispatch()
    })
  }

  runDebate () {
    this.quote.runQuote()
  }
}
