import Phaser from 'phaser'
import Trump from './trump'

export default class Level {
  constructor(game) {
    this.game = game
    this.background = 'baseCorridor'
    this.onLevelComplete = new Phaser.Signal()
    this.trump = new Trump(this.game)
  }

  start() {
    this.game.camera.flash('#000000');

    this.game.add.sprite(0, 0, this.background);
    this.game.add.sprite(50, 201, 'elevator');
    this.game.add.sprite(700, 201, 'elevator');
    this.game.add.existing(this.trump)

    this.trump.onWalkComplete.addOnce(()=>{
      this.game.camera.fade('#000000');
      this.game.camera.onFadeComplete.addOnce(()=>{
        this.onLevelComplete.dispatch()
      }, this)
    })

    
    this.doWalk()
  }

  doWalk() {
    this.trump.doSimpleWalk()
  }
}
