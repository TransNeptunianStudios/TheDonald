import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'
import Elevator from './elevator'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {
	this.game.world.setBounds(0, 0, 2000, 480);
	this.farBackGroup = this.game.add.group()
	this.backGroup = this.game.add.group()
	this.midGroup = this.game.add.group()
	this.menuGrp = this.add.group()

	console.log('Game complete!')

	//this.para = game.add.tileSprite(0, 0, 2000, 480, "office_back");

	//this.farBackGroup.add(this.para)
	this.backGroup.create(0, 0, 'office_sky')
	this.backGroup.create(0, 0, 'office_b1')
	this.backGroup.create(0, 0, 'office_b2')
	this.backGroup.create(0, 0, 'office_f1')
	this.backGroup.create(0, 0, 'office_f2')
	this.backGroup.create(0, 0, 'office_corridor')
//	this.midGroup.create(240, 30, 'end_paint')

	// this.midGroup.create(400, 260, 'plant')
	// this.midGroup.create(800, 260, 'plant')
	// this.midGroup.create(1400, 260, 'plant')

	this.elevator = new Elevator(game, 100, 320, this.backGroup, this.midGroup)

	this.trump = new Trump(this.game)
	this.midGroup.add(this.trump)
	this.trump.position.setTo(100, 335);

	this.elevator.onDoorOpen.addOnce(()=>{
	    this.trump.walkDirection(0, 50);
	    this.trump.walkTween.onComplete.add(()=>{
		this.trump.walkDirection(1400, 0);
		this.trump.walkTween.onComplete.add(()=>{
		    this.trump.frame = 2
		    this.showRetryButton();
		}, this)
	    }, this)
	})

	this.title = this.game.add.sprite(1500, 100, 'you_won_title');
	this.title.anchor.setTo(0.5)

	this.menuGrp.add(this.title)

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.elevator.open();
	}, this)
	this.game.camera.flash('#000000')
	this.game.camera.follow(this.trump)
    }

    showRetryButton() {
	this.retryBtn = this.game.add.button(1700,
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
	//this.para.tilePosition.x = -this.trump.position.x *0.3
    }
}
