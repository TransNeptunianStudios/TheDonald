import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'
import Elevator from './elevator'
import MiniTrump from './minitrump'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {
	ga('send', {
	    hitType: 'event',
	    eventCategory: 'InGame',
	    eventAction: 'completed',
	});

	this.game.world.setBounds(0, 0, 2000, 480);
	this.farBackGroup = this.game.add.group()

	this.backGroup = this.game.add.group()
	this.midGroup = this.game.add.group()
	this.menuGrp = this.add.group()

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
	this.game.time.events.loop(Phaser.Timer.SECOND*3, this.updateGodzilla, this)

	this.game.add.tween(this.godzilla).to( { x: 1900 }, 80000, Phaser.Easing.Linear.None, true);

	this.game.add.tween(this.godzilla).to( { y: '-10' }, 1000, Phaser.Easing.Circular.InOut, true, 0, -1, true);

	this.backGroup.create(0, 0, 'office_corridor')

	this.midGroup.create(200, 260, 'plant')
	this.midGroup.create(740, 260, 'plant')
	this.midGroup.create(1290, 260, 'plant')
	this.midGroup.create(1900, 260, 'plant')

	this.midGroup.create(1700, 220, 'office_throne')

	this.midGroup.create(400, 0, 'hanging_lamp')
	this.midGroup.create(700, 0, 'hanging_lamp')
	this.midGroup.create(1000, 0, 'hanging_lamp')
	this.midGroup.create(1300, 0, 'hanging_lamp')

	this.discoBall = this.midGroup.create(1600, -100, 'office_discoball')
	this.discoBall.anchor.setTo(0.5, 0.5)
	this.discoBall.animations.add('loop_animation')
	this.discoBall.animations.play('loop_animation', 20, true)

	this.elevator = new Elevator(game, 100, 340, this.backGroup, this.midGroup)

	this.trump = new Trump(this.game)
	this.midGroup.add(this.trump)
	this.trump.position.setTo(100, 335);

	this.discoLights = this.midGroup.create(this.discoBall.x, this.discoBall.y, 'disco_lights')
	this.discoLights.anchor.setTo(0.5)
	this.discoLights.scale.setTo(1.7)
	this.discoLights.alpha = 0

	this.elevator.onDoorOpen.addOnce(()=>{
	    this.trump.walkDirection(0, 70);
	    this.trump.walkTween.onComplete.add(()=>{
		this.trump.walkDirection(1500, 0);
		this.trump.walkTween.onComplete.add(()=>{
		    this.game.add.tween(this.discoBall).to({ y: this.discoBall.height/2}, 2000, Phaser.Easing.Sinusoidal.In, true)
		    this.game.add.tween(this.discoLights).to({ alpha: 1}, 1000, Phaser.Easing.Sinusoidal.In, true)
		    this.game.add.tween(this.discoLights).to({ y: this.discoBall.height/2}, 2000, Phaser.Easing.Sinusoidal.In, true)
		    this.game.add.tween(this.discoLights).to({angle: 359}, 8000, null, true, 0, Infinity)
		    this.trump.desolve()
		    this.trump.events.onAnimationComplete.add(function(){
			this.discoNightmare()
		    }, this);
		}, this)
	    }, this)
	})

	this.game.camera.onFlashComplete.addOnce(()=>{
            this.elevator.open();
	}, this)
	this.game.camera.flash('#000000')
	this.game.camera.follow(this.trump)

	this.music = game.add.audio('disco_music');
	this.music.loop = true
	this.music.play()

	this.mute = this.game.add.button(0, 0, 'mute', this.mutePressed, this)
	this.mute.fixedToCamera = true
	this.mute.scale.setTo(0.7)
	if (this.game.muteMusic ){
	    this.music.pause()
	    this.mute.frame = 1
	}
    }

    discoNightmare(){
	var duration = Phaser.Timer.SECOND * 3
	this.trump.visible = false
	game.time.events.add(Phaser.Timer.SECOND * 5, this.fadeToBlack, this);
	for(var n = 0; n < 50; n++){
	    var miniD = new MiniTrump(game, this.trump.x, this.trump.y)
	    var x = this.game.rnd.integerInRange(this.camera.position.x, this.camera.position.x + this.camera.width);
	    var y = this.game.rnd.integerInRange(340, this.game.height);
	    miniD.runTo(x, y, duration)

	    this.midGroup.add(miniD)
	}
    }

    fadeToBlack() {
	this.camera.fade('#FFFFFF', 2000);
        this.camera.onFadeComplete.add(this.showRetryButton,this)
    }

    updateGodzilla(){
	this.godzilla.animations.play('loop_animation', 20)
    }

    showRetryButton() {
	game.world.removeAll()
	this.camera.reset()
	var title = this.game.add.sprite(this.camera.position.x + this.game.width/2,
			     150,
			     'you_won_title');
	title.anchor.setTo(0.5)

	this.retryBtn = this.game.add.button(this.camera.position.x + this.game.width/2,
					     300,
					     'replay_button',
					     this.gotoMainMenu,
					     this,
					     2,
					     1,
					     0);
	this.retryBtn.anchor.setTo(0.5)
    }

    gotoMainMenu(){
	this.music.stop()
	this.state.start('MainMenu')
    }

    update() {
	this.midGroup.sort('y', Phaser.Group.SORT_ACENDING)

	this.b2.tilePosition.x = -this.camera.x *0.0075
	this.f1.tilePosition.x = -this.camera.x *0.05
	this.f2.tilePosition.x = -this.camera.x *0.1
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
