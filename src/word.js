import Phaser from 'phaser'
import TextButton from './textbutton'

export default class Word {
  constructor (game, word) {
    this.game = game
    this.word = word
    this.onWordPressed = new Phaser.Signal()
  }

  runWord () {
    // Get a random position
    let rndX = this.game.rnd.integerInRange(0, this.game.width)
    let rndY = this.game.rnd.integerInRange(0, this.game.height)
    
    let text = this.game.add.text(rndX,
                                  rndY,
                                  '   ' + this.word + '   ',
                                  {
                                    font: '16px Verdana',
                                    fill: '#ffffff',
                                    backgroundColor: 'rgba(0,255,0,0.25)'
                                  })

    text.inputEnabled = true

    text.events.onInputDown.addOnce(() => {
      this.onWordPressed.dispatch()
      text.destroy()
    })
  }
}
