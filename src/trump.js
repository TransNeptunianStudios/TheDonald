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

    this.onCallingElevator = new Phaser.Signal()
    this.onReadyForDebate = new Phaser.Signal()
    this.walkTween = this.game.add.tween(this);

    this.createQuotes()
  }

  // walks trump in a direction with the animation running
  walkDirection(dx, dy){
    let time = Math.max(Math.abs(dx), Math.abs(dy))*5;

    this.walkTween = this.game.add.tween(this).to({x: this.x+dx,y: this.y+dy}, time, Phaser.Easing.Linear.None, true);
    this.walkTween.onComplete.add(()=>{this.animations.stop()}, this)

    if( dx == 0 && dy == 0 ) this.animations.stop()
    else if( dx > 0 ) this.animations.play('east')
    else if( dy > 0 ) this.animations.play('south')
    else if( dx < 0 ) this.animations.play('west')
    else if( dy < 0 ) this.animations.play('north')

    return this.walkTween;
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

    let noAction = new Quote(game, 'noAction')
    noAction.addWord('to', 0.0, 0.25)
    noAction.addWord('much', 0.20, 0.35)
    noAction.addWord('talk', 0.6, 0.5)
    noAction.addWord('not', 1.30, 0.22)
    noAction.addWord('enough', 1.55, 0.20)
    noAction.addWord('action', 1.75, 0.4)
    this.quotes.push(noAction)
  }

  // walks from elevator to elevator
  doFullWalk() {
    this.walkDirection(0, 120).onComplete.addOnce(()=>{
        this.walkDirection(670, 0).onComplete.addOnce(()=>{
          this.walkDirection(0, -100).onComplete.addOnce(()=>{
            this.onCallingElevator.dispatch();
          }, this)
        }, this)
    }, this)
  }

  // walks from elevator to level middle
  doDebateWalk() {
    this.walkDirection(0, 120).onComplete.addOnce(()=>{
      this.walkDirection(335, 0).onComplete.addOnce(()=>{
        this.onReadyForDebate.dispatch();
      }, this)
    }, this)
  }

  // walks from middle to end elevator
  doRestOfWalk() {
    this.walkDirection(335, 0).onComplete.addOnce(()=>{
      this.walkDirection(0, -100).onComplete.addOnce(()=>{
        this.onCallingElevator.dispatch();
      }, this)
    }, this)
  }
}
