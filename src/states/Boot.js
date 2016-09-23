import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#FFFFFF'
  }

  preload () {
    this.load.image('tnsLogo', './assets/images/tns-logo.png')
  }

  create () {
    this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tnsLogo')
    this.game.time.events.add(Phaser.Timer.SECOND * 5, this.fadeLogo, this)
  }

  fadeLogo () {
    this.tween = this.game.add.tween(this.logo).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true)
    this.tween.onComplete.add(this.fadeComplete, this)
  }

  fadeComplete () {
    this.state.start('Splash')
  }
}
