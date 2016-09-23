import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {
    this.stage.backgroundColor = '#FFFFFF'
  }

  preload () {
    // Load stuff that shall be used in splash screen
    //this.load.image('loaderBar', './assets/images/loader-bar.png')
  }

  render () {
    this.state.start('Splash')
  }
}
