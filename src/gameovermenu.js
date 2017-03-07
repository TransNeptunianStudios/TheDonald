import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'
import Elevator from './elevator'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {
	this.backGroup = this.game.add.group()
	this.midGroup = this.game.add.group()
	this.menuGrp = this.add.group()

	console.log('Game complete!')
	this.backGroup.create(0, 0, 'office')
	this.elevator = new Elevator(game, this.game.width-100, 341, this.backGroup, this.midGroup)

	this.trump = new Trump(this.game)
	this.midGroup.add(this.trump)
	this.trump.position.setTo(this.game.width-100, 335);

	this.elevator.onDoorOpen.addOnce(()=>{
	    this.trump.walkDirection(0, 50);
	    this.trump.walkTween.onComplete.add(()=>{
		this.trump.walkDirection(-450, 0);
		this.trump.walkTween.onComplete.add(()=>{
		    this.trump.frame = 2
		    this.showRetryButton();
		}, this)
	    }, this)
	})

	this.title = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'you_won_title');
	this.title.anchor.setTo(0.5)

	this.menuGrp.add(this.title)

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.elevator.open();
	}, this)
	this.game.camera.flash('#000000')
    }

    showRetryButton() {
	this.retryBtn = this.game.add.button(this.game.world.centerX,
					     this.game.world.height-150,
					     'replay_button',
					     this.gotoMainMenu,
					     this,
					     0,
					     1,
					     2);
	this.retryBtn.anchor.setTo(0.5)
    }

    gotoMainMenu(){
	this.state.start('MainMenu')
    }

    update() {
	this.midGroup.sort('y', Phaser.Group.SORT_DECENDING)
    }
}
