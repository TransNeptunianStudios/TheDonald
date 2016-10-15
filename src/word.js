import Phaser from 'phaser'
import TextButton from './textbutton'

export default class Word {
  constructor(game, word) {
    this.game = game
    this.word = word
    this.onWordPressed = new Phaser.Signal()

    // Get a random position
    let rndX = this.game.rnd.integerInRange(0, this.game.width)
    let rndY = this.game.rnd.integerInRange(0, this.game.height)

    this.text = new Phaser.Text(
      game,
      rndX,
      rndY,
      '   ' + this.word + '   ',
      {
        font: '16px Verdana',
        fill: '#ffffff',
        backgroundColor: 'rgba(0,255,0,0.25)'
      })

    this.text.inputEnabled = true
  }

  runWord() {
   this.game.add.existing(this.text)
    
    this.text.events.onInputDown.addOnce(() => {
      this.onWordPressed.dispatch()
      this.text.destroy()
   })
 }
}
