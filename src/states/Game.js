/* globals __DEV__ */
import Phaser from 'phaser'

export default class extends Phaser.State {
  init () {}
  preload () {}

  create () {
    this.newCorridor();
  }

  newCorridor () {
     this.camera.flash('#000000');

    this.background = this.game.add.sprite(0, 0, 'baseCorridor');
    this.inElevator = this.game.add.sprite(50, 201, 'elevator');
    this.outElevator = this.game.add.sprite(700, 201, 'elevator');

    this.trump = this.game.add.sprite(90, 340, 'trump');
    this.trump.anchor.setTo(0.5, 1);

    // Create simple walk
    let trumpWalkOut = this.game.add.tween(this.trump).to({y: 450}, 1000, Phaser.Easing.Linear.None, true, 1000);
    let trumpWalkOver = this.game.add.tween(this.trump).to({x: 750}, 3000, Phaser.Easing.Linear.None);
    let trumpWalkIn = this.game.add.tween(this.trump).to({y: 340}, 1000, Phaser.Easing.Linear.None);

    trumpWalkOut.chain(trumpWalkOver);
    trumpWalkOver.chain(trumpWalkIn);
    trumpWalkIn.onComplete.add(()=>{
      this.camera.fade('#000000');
      this.camera.onFadeComplete.add(this.newCorridor, this);
      }, this)
  }

  render () {
//    if (__DEV__) {
//    }
  }
}
