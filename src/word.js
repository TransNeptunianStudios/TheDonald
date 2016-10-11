import Phaser from 'phaser'

export default class Word {
  constructor (game, sound, word) {
    this.game = game
    this.sound = sound
    this.word = word
    this.onWordComplete = new Phaser.Signal()
    this.sound.onStop.add(() => {
      this.onWordComplete.dispatch()
    })
  }

  runWord () {
    let text = this.game.add.text(this.game.world.centerX,
                                  this.game.world.centerY,
                                  this.word,
                                  {font: "65px Arial",
                                   fill: "#ff0044",
                                   align: "center"})

    text.anchor.set(0.5)

    text.inputEnabled = true

    text.events.onInputDown.add(() => {
      this.sound.play(this.word)
    })
  }
}
