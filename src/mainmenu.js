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
	this.background = this.game.add.sprite(0, 0, 'menuBackground')

	var title = this.game.add.sprite(-300, 50, 'title')
	title.anchor.setTo(0.5)
	this.game.add.tween(title).to({ x: 660}, 1000 + 2000, Phaser.Easing.Sinusoidal.In, true)

	this.playBtn = this.game.add.button(game.world.centerX-20,
					    this.game.world.centerY + 100,
					    'play_button',
					    this.playPressed,
					    this,
					    2,
					    1,
					    0);
	this.playBtn.anchor.setTo(0.5)
	var credit = new Phaser.Text(game, game.world.width-20, game.world.height-60, "By:\nDavid Levi\nMikael Larsson\nRobin Reicher",
	    {
		font: '12px Arial',
		fill: 'gold'
	    })
	credit.anchor.set(1, 1)
	var version = new Phaser.Text(game, game.world.width-10, game.world.height, "version 0.1",
	    {
		font: '12px Arial',
		fill: 'gold'
	    })
	version.anchor.set(1, 1)


	this.menuGrp = this.add.group()
	this.menuGrp.add(title)
	this.menuGrp.add(this.playBtn)
	this.menuGrp.add(version)
	this.menuGrp.add(credit)

	this.music = game.add.audio('march_music');
	this.music.play()

	this.mute = this.game.add.button(0, 0, 'mute', this.mutePressed, this)
	this.mute.scale.setTo(0.3)
	if (this.game.muteMusic ){
	    this.music.pause()
	    this.mute.frame = 1
	}
    }

    playPressed () {
	this.music.stop()
	this.state.start('Game');
    }

    mutePressed() {
	this.game.muteMusic = !this.game.muteMusic;

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
