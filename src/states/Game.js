/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.background = this.game.add.sprite(0, 0, 'baseCorridor');
    this.trump = this.game.add.sprite(150, 300, 'trump');
  }

  render () {
//    if (__DEV__) {
//    }
  }
}
