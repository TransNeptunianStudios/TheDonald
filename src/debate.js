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
    this.quote.onQuoteComplete.add(() => {
      this.onDebateComplete.dispatch()
    })
  }

  runDebate () {
    this.quote.runQuote()
  }
}
