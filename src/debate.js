import Phaser from 'phaser'

export default class Debate {
  constructor (game, trump, opponent) {
    this.game = game
    this.trump = trump
    this.opponent = opponent
    this.onDebateComplete = new Phaser.Signal()
  }

  runDebate () {
    this.opponent.askQuestion();
    let quote = this.trump.quotes.pop()
    if(!quote){
      console.log('No more quotes, I guess you lost?')
      return;
    }

    // wait 2 seconds then show trump thoughts
    this.opponent.waitingForAnswer.addOnce((wordsInOrder) => {
      quote.runQuote()
    }, this)

    quote.onQuoteComplete.addOnce((wordsInOrder) => {
      this.opponent.getStupidAnswer()
      console.log('Words in order: ' + wordsInOrder)

      if(this.opponent.sanity > 0)
        this.runDebate();
      else
        this.onDebateComplete.dispatch()
    })

  }
}
