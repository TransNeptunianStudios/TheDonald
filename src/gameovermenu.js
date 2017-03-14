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

	this.farBackGroup.create(0, 0, 'office_sky')
	this.nuke = this.farBackGroup.create(1370, 190, 'office_nuke')
	this.nuke.animations.add('loop_animation')
	this.nuke.animations.play('loop_animation', 10, true)


	this.b1 = game.add.tileSprite(200, 252, 800, 55, "office_b1")
	this.b2 = game.add.tileSprite(300, 252, 800, 55, "office_b2")
	this.f1 = game.add.tileSprite(400, 252, 800, 55, "office_f1")
	this.f2 = game.add.tileSprite(500, 252, 800, 55, "office_f2")

	this.backGroup.add(this.b1)
	this.backGroup.add(this.b2)
	this.backGroup.add(this.f1)
	this.backGroup.add(this.f2)

	this.godzilla = this.backGroup.create(650, 220, 'office_godzilla')
	this.godzilla.animations.add('loop_animation')
	this.godzilla.animations.play('loop_animation', 3, true)
	this.game.add.tween(this.godzilla).to( { x: 1300 }, 45000, Phaser.Easing.Linear.None, true);

	//this.farBackGroup.add(this.para)
	this.backGroup.create(0, 0, 'office_corridor')
//	this.midGroup.create(240, 30, 'end_paint')

	this.midGroup.create(200, 260, 'plant')
	this.midGroup.create(600, 260, 'plant')
	this.midGroup.create(1200, 260, 'plant')
	this.midGroup.create(1900, 260, 'plant')

	this.midGroup.create(400, 0, 'hanging_lamp')
	this.midGroup.create(700, 0, 'hanging_lamp')
	this.midGroup.create(1000, 0, 'hanging_lamp')
	this.midGroup.create(1300, 0, 'hanging_lamp')

	this.elevator = new Elevator(game, 100, 340, this.backGroup, this.midGroup)

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

	this.title = this.game.add.sprite(1600, 100, 'you_won_title');
	this.title.anchor.setTo(0.5)

	this.menuGrp.add(this.title)

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.elevator.open();
	}, this)
	this.game.camera.flash('#000000')
	this.game.camera.follow(this.trump)
    }

    showRetryButton() {
	this.retryBtn = this.game.add.button(1750,
					     250,
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

	this.b1.tilePosition.x = -this.camera.x *0.05
	this.b2.tilePosition.x = -this.camera.x *0.075
	this.f1.tilePosition.x = -this.camera.x *0.1
	this.f2.tilePosition.x = -this.camera.x *0.15
    }
}
