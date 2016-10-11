import Phaser from 'phaser'
import Trump from '../objects/Trump'

export default class Level {
  constructor(game) {
    this.game = game
    this.background = 'baseCorridor'
    this.onLevelComplete = new Phaser.Signal()

    this.trump = new Trump(this.game)
  }

  start() {
    this.game.camera.flash('#000000');

    this.backgroundGroup = this.game.add.group();
    this.gameGroup = this.game.add.group();

    this.backgroundGroup.create(0, 0, this.background);
    this.backgroundGroup.create(50, 201, 'elevator');
    this.backgroundGroup.create(700, 201, 'elevator');
    this.gameGroup.add(this.trump)

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
