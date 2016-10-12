import Phaser from 'phaser'
import Quote from './quote'

export default class Trump extends Phaser.Sprite {
  constructor(game) {
    super(game, 90, 335, 'trump')
    this.anchor.setTo(0.5, 1);

    // while we use knug graphics
    this.scale.setTo(2.5, 2.5);
    this.frame = 2;
    this.animations.add('north', [4, 5, 6, 7, 8, 9, 10, 11], 15, true);
    this.animations.add('west', [12, 13, 14, 15, 16, 17, 18, 19], 15, true);
    this.animations.add('south', [20, 21, 22, 23, 24, 25, 26, 27], 15, true);
    this.animations.add('east', [28, 29, 30, 31, 32, 33, 34, 35], 15, true);

    this.onWalkComplete = new Phaser.Signal()
    this.onWalkToPercentComplete = new Phaser.Signal()

    this.menuTween = this.game.add.tween(this).to({x: 600}, 1000, Phaser.Easing.Linear.None)
    this.menuTween.onStart.add(()=>{this.animations.play('east')}, this)
    this.menuTween.onComplete.add(()=>{this.animations.stop()}, this)

    this.enterTween = this.game.add.tween(this).to({y: 450}, 1000, Phaser.Easing.Linear.None, false, 500);
    this.enterTween.onStart.add(()=>{this.animations.play('south')}, this)
    this.enterTween.onComplete.add(()=>{this.animations.stop()}, this)

    this.exitTween = this.game.add.tween(this).to({y: 355}, 1000, Phaser.Easing.Linear.None);
    this.exitTween.onStart.add(()=>{this.animations.play('north')}, this)
    this.exitTween.onComplete.addOnce(()=>{
      this.onWalkComplete.dispatch()
      this.animations.stop()
    }, this)

    this.createQuotes()
  }

  createQuotes () {
    this.quotes = []

    let suffer = new Quote(game, 'suffer')
    suffer.addWord('i', 0.0, 0.35)
    suffer.addWord('just', 0.35, 0.30)
    suffer.addWord('want', 0.65, 0.25)
    suffer.addWord('them', 0.90, 0.20)
    suffer.addWord('to', 1.10, 0.25)
    suffer.addWord('suffer', 1.35, 0.65)
    this.quotes.push(suffer)
  }

  walkOverTween(percent) {
    let tween = this.game.add.tween(this).to({x: 750 * percent}, 3000 * percent, Phaser.Easing.Linear.None)
    tween.onStart.add(()=>{this.animations.play('east')}, this)
    tween.onComplete.add(()=>{this.animations.stop()}, this)
    return tween
  }

  finishWalkOverTween() {
    let percentOfWalkLeft = 1.0 - ((this.x - 90) / 660)
    let tween = this.game.add.tween(this).to({x: 750}, 3000 * percentOfWalkLeft, Phaser.Easing.Linear.None)
    tween.onStart.add(()=>{this.animations.play('east')}, this)
    tween.onComplete.add(()=>{this.animations.stop()}, this)
    return tween
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
