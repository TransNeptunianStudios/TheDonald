import Phaser from 'phaser'
import Elevator from './elevator'
import Trump from './trump'
import Debate from './debate'

export default class Level {
  constructor(game) {
    this.game = game
    this.background = 'baseCorridor'
    this.onLevelComplete = new Phaser.Signal()

    this.trump = new Trump(this.game)
  }


  start() {
    // backgroup for all background stuff
    // midgroup is above and z-ordered
    this.backGroup = this.game.add.group()
    this.midGroup = this.game.add.group()

    this.backGroup.create(0, 0, this.background)

    this.inElevator = new Elevator(game, 100, 341, this.backGroup, this.midGroup)
    this.outElevator = new Elevator(game, this.game.width-100, 341, this.backGroup, this.midGroup)

    // trump and possible opponent added
    this.midGroup.add(this.trump)
    if(this.opponent)
      this.midGroup.add(this.opponent)

    // When trump is calling an elevator, open it and walk trump
    // into it. When door closed, start fade, then lvl complete
    this.trump.onCallingElevator.addOnce(()=>{
      this.outElevator.open();
      this.outElevator.onDoorOpen.addOnce(()=>{
        this.trump.walkDirection(0, -30);
      }, this)
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

    this.game.camera.onFlashComplete.addOnce(()=>{
        this.inElevator.open();
    }, this)

    this.game.camera.flash('#000000')
  }

  startDebate() {
    let debate = new Debate(this.game, this.trump, this.opponent)
    debate.onDebateComplete.addOnce(()=>{
      this.trump.doRestOfWalk()
    }, this)
    debate.runDebate()
  }

  doWalk() {
    this.trump.doFullWalk()
  }

  update() {
    this.midGroup.sort('y', Phaser.Group.SORT_DECENDING)
  }
}
