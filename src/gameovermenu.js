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
		    this.trump.game_over()
		}, this)
	    }, this)
	})

	this.title = new Phaser.Text(this.game, this.game.world.centerX, this.game.world.centerY-this.game.world.height/6, 'You WON', {
	    font: '36px Tahoma',
	    fill: 'white',
	    align: 'center'
	})

	this.title.anchor.setTo(0.5)

	this.playBtn = new TextButton({
	    game: this.game,
	    x: this.game.world.centerX,
	    y: this.game.world.centerY,
	    asset: 'playBtn',
	    overFrame: 2,
	    outFrame: 1,
	    downFrame: 0,
	    upFrame: 1,
	    label: 'Ok',
	    style: {
		font: '16px Verdana',
		fill: 'white',
		align: 'center'
	    },
	    callback: this.okPressed,
	    callbackContext: this
	})

	this.menuGrp.add(this.title)
	this.menuGrp.add(this.playBtn)

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.elevator.open();
	}, this)
	this.game.camera.flash('#000000')
    }

    okPressed () {
	this.state.start('MainMenu');
    }

    update() {
	this.midGroup.sort('y', Phaser.Group.SORT_DECENDING)
    }
}
