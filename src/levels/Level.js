import Phaser from 'phaser'
import Trump from '../objects/Trump'
import Elevator from '../objects/Elevator'

export default class Level {
  constructor(game) {
    this.game = game
    this.background = 'baseCorridor'
    this.onLevelComplete = new Phaser.Signal()

    this.trump = new Trump(this.game)
  }

  start() {
    this.game.camera.flash('#000000')

    this.backGroup = this.game.add.group()
    this.midGroup = this.game.add.group()

    this.backGroup.create(0, 0, this.background)

    this.inElevator = new Elevator(game, 100, 341, this.backGroup, this.midGroup)
    this.outElevator = this.backGroup.create(700, 201, 'elevator')

    this.midGroup.add(this.trump)

    this.trump.onWalkComplete.addOnce(()=>{
      this.game.camera.fade('#000000');
      this.game.camera.onFadeComplete.addOnce(()=>{
        this.onLevelComplete.dispatch()
      }, this)
    })

    this.inElevator.onDoorOpen.addOnce(()=>{
      this.doWalk()
    })

    this.inElevator.open(1500);
  }

  doWalk() {
    this.trump.doSimpleWalk()
  }

  update() {
    this.midGroup.sort('y', Phaser.Group.SORT_DECENDING)
  }
}
