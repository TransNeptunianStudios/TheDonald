import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
	this.game.world.setBounds(0, 0, 854, 480);
	this.game.muteMusic = false
    }

    create () {
	this.game.camera.flash('#000000')
	this.game.world.setBounds(0, 0, 854, 1440);
	this.game.camera.setPosition(0, 0);
	this.game.add.tween(this.camera).to({ y: 960}, 5000, Phaser.Easing.Linear.None, true).onComplete.add(()=>{
	    this.bigD.visible = true;
	    var bigDTween = this.game.add.tween(this.bigD).to({ y: 1450}, 1200, Phaser.Easing.Bounce.Out, true)
	    bigDTween.onComplete.addOnce(this.showShit, this)
	}, this)

	this.sky = game.add.tileSprite(0, 0, 854, 1440, 'sky')
	var credits = this.game.add.sprite(this.game.world.centerX, 480, 'credits')
	credits.anchor.setTo(0.5, 0)
	credits.scale.setTo(2)
	this.skyline = game.add.sprite(0, 960, 'skyline')

	this.title = this.game.add.sprite(-200, 1020, 'title')
	this.title.anchor.setTo(0.5)

	this.bigD = this.game.add.sprite(427, 960, 'bigDonald')
	this.bigD.anchor.setTo(0.5, 1)
	this.bigD.visible = false

	this.playBtn = this.game.add.button(game.world.centerX,
					    1300,
					    'play_button',
					    this.playPressed,
					    this,
					    2,
					    1,
					    0);
	this.playBtn.anchor.setTo(0.5)
	this.playBtn.visible = false
	this.version = new Phaser.Text(game, game.world.width-10, game.world.height, "version 0.3",
				       {
					   font: 'bold 10px Arial',
					   fill: 'white'
				       })
	this.version.anchor.set(1, 1)
	this.version.visible = false

	this.menuGrp = this.add.group()
	this.menuGrp.add(this.title)
	this.menuGrp.add(this.playBtn)
	this.menuGrp.add(this.version)

	this.music = game.add.audio('march_music');
	//this.music.play() // for my own sanity

	this.mute = this.game.add.button(0, 0, 'mute', this.mutePressed, this)
	this.mute.fixedToCamera = true
	this.mute.scale.setTo(0.7)
	if (this.game.muteMusic ){
	    this.music.pause()
	    this.mute.frame = 1
	}
    }

    update() {
	this.sky.tilePosition.x -= 0.2
    }

    playPressed () {
	this.music.stop()
	game.add.audio('blip').play()
	this.state.start('Game');
    }

    showShit() {
	this.game.add.tween(this.title).to({ x: 660}, 1000, Phaser.Easing.Sinusoidal.In, true)
	this.playBtn.visible = true
	this.version.visible = true;
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
