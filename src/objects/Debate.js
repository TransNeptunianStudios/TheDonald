import Phaser from 'phaser'

export default class Debate {
  constructor (game, trumpPhrases, opponentPhrases) {
    this.game = game
    this.trumpPhrases = trumpPhrases
    this.opponentPhrases = opponentPhrases
    this.onDebateComplete = new Phaser.Signal()
  }

  runDebate () {
    let qoute = this.game.add.audio('suffer')
    qoute.onStop.add(()=>{
      this.onDebateComplete.dispatch()
    }, this)
    qoute.play()
  }
}
