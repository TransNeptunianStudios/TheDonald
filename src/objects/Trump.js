import Phaser from 'phaser'

export default class Trump extends Phaser.Sprite {
  constructor(game) {
    super(game, 90, 340, 'trump')
    this.anchor.setTo(0.5, 1);
    this.onWalkComplete = new Phaser.Signal()
    this.onWalkToPercentComplete = new Phaser.Signal()
    this.enterTween = this.game.add.tween(this).to({y: 450}, 1000, Phaser.Easing.Linear.None, false, 1000);
    this.exitTween = this.game.add.tween(this).to({y: 340}, 1000, Phaser.Easing.Linear.None);
    this.exitTween.onComplete.addOnce(()=>{
      this.onWalkComplete.dispatch()
    }, this)
  }

  walkOverTween(percent) {
    return this.game.add.tween(this).to({x: 750 * percent}, 3000 * percent, Phaser.Easing.Linear.None);
  }

  finishWalkOverTween() {
    let percentOfWalkLeft = 1.0 - ((this.x - 90) / 660)
    return this.game.add.tween(this).to({x: 750}, 3000 * percentOfWalkLeft, Phaser.Easing.Linear.None);
  }

  doSimpleWalk() {
    let trumpWalkOver = this.walkOverTween(1.0)
    this.enterTween.chain(trumpWalkOver);
    trumpWalkOver.chain(this.exitTween);
    this.enterTween.start()
  }

  doWalkToPercent(percent) {
    this.percent = percent
    let walkOverTween = this.walkOverTween(percent)
    this.enterTween.chain(walkOverTween);
    walkOverTween.onComplete.addOnce(()=>{
      this.onWalkToPercentComplete.dispatch()
    }, this)
    this.enterTween.start()
  }

  doRestOfWalk() {
    let walkOverTween = this.finishWalkOverTween()
    walkOverTween.chain(this.exitTween);
    walkOverTween.start()
  }
}
