import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.state.start('Splash')
  }
}
