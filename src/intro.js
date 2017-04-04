/* globals __DEV__ */
import Phaser from 'phaser'
import Trump from './trump'
import Elevator from './elevator'

export default class extends Phaser.State {
    init () {
    }

    preload () {}

    create () {
	this.music = this.game.add.audio('music');
	//this.music.play()

	this.mute = this.game.add.button(0, 0, 'mute', this.mutePressed, this)
	this.mute.scale.setTo(0.7)
	if (this.game.muteMusic ){
	    this.mute.frame = 1
	    this.music.pause()
	}
	this.game.camera.flash('#000000')
	this.backGroup = this.game.add.group()
	this.midGroup = this.game.add.group()
	this.backGroup.create(0, 0, 'street')

	this.trump = new Trump(this.game, -50, 360)
	this.midGroup.add(this.trump)
	
	this.runStreet()
    }

    runStreet () {
	this.trump.walkDirection(640, 0).onComplete.add(()=>{
	    this.trump.walkDirection(0, -20).onComplete.add(()=>{
		// Open door sound
		this.runLobby()
	    }, this)
	}, this)
    }

    runLobby() {
	this.backGroup.create(0, 0, 'lobby')
	this.elevator = new Elevator(game, this.game.width-80, 341, this.backGroup, this.midGroup)
	this.trump.position.setTo(200, 360)

	this.trump.walkDirection(0, 70).onComplete.add(()=>{
	    this.trump.walkDirection(570, 0).onComplete.add(()=>{
		this.trump.walkDirection(0, -65).onComplete.add(()=>{
		    this.callElevator()
		}, this)
	    }, this)
	}, this)
    }

    callElevator(){
	// When trump is calling an elevator, open it and walk trump
	// into it. When door closed, start fade, then lvl complete
	this.elevator.open();
	this.elevator.onDoorOpen.addOnce(()=>{
	    this.trump.walkDirection(0, -30);
	}, this)
	this.elevator.onDoorClose.addOnce(()=>{
	    this.game.camera.fade('#000000');
	    this.game.camera.onFadeComplete.addOnce(()=>{
		this.state.start('Game');
	    }, this)
	}, this)
    }

    update () {
	this.midGroup.sort('y', Phaser.Group.SORT_ASCENDING);
    }

    mutePressed() {
	this.game.muteMusic = !this.game.muteMusic
	if(!this.game.muteMusic){
	    this.mute.frame = 0
	    this.music.resume()
	}
	else{
	    this.mute.frame = 1
	    this.music.pause()
	}
    }
}
