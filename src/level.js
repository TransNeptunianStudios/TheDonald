import Phaser from 'phaser'
import Elevator from './Elevator'
import Trump from './trump'

export default class Level {
  constructor(game) {
    this.game = game
    this.background = 'baseCorridor'
    this.onLevelComplete = new Phaser.Signal()

    this.trump = new Trump(this.game)
  }

  start() {
    this.backGroup = this.game.add.group()
    this.midGroup = this.game.add.group()

    this.backGroup.create(0, 0, this.background)

    this.inElevator = new Elevator(game, 100, 341, this.backGroup, this.midGroup)
    this.outElevator = new Elevator(game, this.game.width-100, 341, this.backGroup, this.midGroup)

    this.midGroup.add(this.trump)

    this.trump.onWalkComplete.addOnce(()=>{
      this.outElevator.open(1000);
      this.game.add.tween(this.trump).to({y: 335}, 500, Phaser.Easing.Linear.None, true, 500);
      this.outElevator.onDoorClose.addOnce(()=>{
        this.game.camera.fade('#000000');
        this.game.camera.onFadeComplete.addOnce(()=>{
          this.onLevelComplete.dispatch()
        }, this)
      }, this)
    })

    this.inElevator.onDoorOpen.addOnce(()=>{
      this.doWalk()
    })

    this.game.camera.flash('#000000')
    this.game.camera.onFlashComplete.addOnce(()=>{
        this.inElevator.open(1000);
    }, this)
  }

  doWalk() {
    this.trump.doSimpleWalk()
  }

  update() {
    this.midGroup.sort('y', Phaser.Group.SORT_DECENDING)
  }
}
