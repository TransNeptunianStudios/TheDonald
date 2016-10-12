import Phaser from 'phaser'

export default class Debate {
  constructor (game, trumpQuotes, opponentQuotes) {
    this.game = game
    this.trumpQuotes = trumpQuotes
    this.opponentQuotes = opponentQuotes
    this.onDebateComplete = new Phaser.Signal()
  }

  runDebate () {
    let quote = this.trumpQuotes.pop()

    quote.runQuote()

    quote.onQuoteComplete.addOnce((wordsInOrder) => {

      console.log('Words in order: ' + wordsInOrder)
      
      if (this.trumpQuotes.length != 0) {
        this.runDebate()
      }
      else {
        this.onDebateComplete.dispatch()
      }
    })
    
  }
}
