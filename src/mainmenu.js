import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#000000'
  }

  create () {

    this.background = this.game.add.sprite(0, 0, 'menuBackground');

    this.title = new Phaser.Text(this.game, this.game.world.centerX, 40, 'The Donald', {
      font: '36px Tahoma',
      fill: 'black',
      align: 'center'
    })

    this.title.anchor.setTo(0.5)

    this.playBtn = new TextButton({
      game: this.game,
      x: this.game.world.centerX,
      y: this.game.world.centerY+80,
      asset: 'playBtn',
      overFrame: 2,
      outFrame: 1,
      downFrame: 0,
      upFrame: 1,
      label: 'Play',
      style: {
        font: '16px Verdana',
        fill: 'white',
        align: 'center'
      },
      callback: this.playPressed,
      callbackContext: this
    })

    this.menuGrp = this.add.group()
    this.menuGrp.add(this.title)
    this.menuGrp.add(this.playBtn)
  }

  playPressed () {
      this.state.start('Game');
  }
}
