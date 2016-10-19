import Phaser from 'phaser'

export default class Elevator  {
  constructor(game, x, y, backGroup, midGroup) {

    this.position = new Phaser.Point(x, y)

    this.onDoorOpen = new Phaser.Signal()
    this.onDoorClose = new Phaser.Signal()

    this.base = backGroup.create(x, y, 'elevator')
    this.base.anchor.setTo(0.5, 1)

    this.button = backGroup.create(5 + x + this.base.width/2, y - 70, 'elevator-button')
    this.base.anchor.setTo(0.5, 1)

    this.door = midGroup.create(x, y, 'elevator-door')
    this.door.position.x += this.door.width/2;
    this.door.anchor.setTo(1, 1)

    this.arriveSound = game.add.audio('elevatorBing');

    this.openTween = game.add.tween(this.door.scale).to({ x: 0}, 500, Phaser.Easing.Linear.None, false);
    this.closeTween = game.add.tween(this.door.scale).to({ x: 1}, 500, Phaser.Easing.Linear.None, false, 1000);
    this.openTween.chain(this.closeTween);
  }

  open () {
    this.arriveSound.play('', 0, 0.5);
    this.closeTween.delay(500)

    this.openTween.onComplete.addOnce(()=>{
      this.onDoorOpen.dispatch();
    }, this)
    this.closeTween.onComplete.addOnce(()=>{
      this.onDoorClose.dispatch();
    }, this)

    this.openTween.start();
  }
}
