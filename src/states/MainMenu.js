import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#002233'
  }

  preload () {
  }

  create () {
    this.state.start('Game')
  }
}
