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
	this.game.world.setBounds(0, 0, 854, 480);
	
	this.sky = game.add.tileSprite(0, 0, 854, 480, 'sky')
	this.skyline = game.add.sprite(0, 480, 'skyline')
	this.game.add.tween(this.skyline).to({ y: 0}, 2000, Phaser.Easing.Sinusoidal.In, true)
	this.bigD = game.add.sprite(427, -480, 'bigDonald')
	this.bigD.anchor.setTo(0.5, 0)
	var bigDTween = this.game.add.tween(this.bigD).to({ y: 55}, 1200, Phaser.Easing.Bounce.Out, true, 2000)
	bigDTween.onComplete.addOnce(this.showShit, this)
	
	this.title = this.game.add.sprite(-200, 45, 'title')
	this.title.anchor.setTo(0.5)

	this.playBtn = this.game.add.button(game.world.centerX,
					    this.game.world.centerY + 110,
					    'play_button',
					    this.playPressed,
					    this,
					    2,
					    1,
					    0);
	this.playBtn.anchor.setTo(0.5)
	this.playBtn.visible = false
	
	this.credit = new Phaser.Text(game, game.world.width-20, game.world.height-50, "By:\nDavid Levi\nMikael Larsson\nRobin Reicher",
	    {
		font: 'bold 12px Arial',
		fill: 'white'
	     })
	this.credit.anchor.set(1, 1)
	this.credit.visible = false
	this.version = new Phaser.Text(game, game.world.width-10, game.world.height, "version 0.2",
	    {
		font: 'bold 12px Arial',
		fill: 'white'
	    })
	this.version.anchor.set(1, 1)
	this.version.visible = false
	
	this.menuGrp = this.add.group()
	this.menuGrp.add(this.title)
	this.menuGrp.add(this.playBtn)
	this.menuGrp.add(this.version)
	this.menuGrp.add(this.credit)

	this.music = game.add.audio('march_music');
	this.music.play()

	this.mute = this.game.add.button(0, 0, 'mute', this.mutePressed, this)
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
	this.state.start('Game');
    }

    showShit() {
	this.game.add.tween(this.title).to({ x: 660}, 1000, Phaser.Easing.Sinusoidal.In, true)
	//this.title.alpha = 1
	this.playBtn.visible = true
	this.version.visible = true;
	this.credit.visible = true
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
