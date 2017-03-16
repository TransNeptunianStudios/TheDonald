import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
	this.game.world.setBounds(0, 0, 854, 480);
    }

    create () {
	this.game.world.setBounds(0, 0, 854, 480);
	this.background = this.game.add.sprite(0, 0, 'menuBackground')

	var title = this.game.add.sprite(-300, 50, 'title')
	title.anchor.setTo(0.5)
	this.game.add.tween(title).to({ x: 660}, 1000 + 2000, Phaser.Easing.Bounce.Out, true)

	this.playBtn = this.game.add.button(game.world.centerX-20,
					    this.game.world.centerY + 100,
					    'play_button',
					    this.playPressed,
					    this,
					    0,
					    1,
					    2);
	this.playBtn.anchor.setTo(0.5)
	var credit = new Phaser.Text(game, game.world.width-20, game.world.height-60, "By:\nDavid Levi\nMikael Larsson\nRobin Reicher",
	    {
		font: '10px Arial'
	    })
	credit.anchor.set(1, 1)
	var version = new Phaser.Text(game, game.world.width-10, game.world.height, "version 0.1",
	    {
		font: '10px Arial'
	    })
	version.anchor.set(1, 1)


	this.menuGrp = this.add.group()
	this.menuGrp.add(title)
	this.menuGrp.add(this.playBtn)
	this.menuGrp.add(version)
	this.menuGrp.add(credit)
    }

    playPressed () {
	this.state.start('Game');
    }
}
