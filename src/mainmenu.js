import Phaser from 'phaser'
import TextButton from './textbutton'
import Trump from './trump'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    create () {

	this.background = this.game.add.sprite(0, 0, 'menuBackground');

	this.title = new Phaser.Text(this.game, this.game.world.centerX, 40, 'The Donald', {
	    font: '36px Tahoma',
	    fill: 'black',
	    align: 'center'
	})

	this.title.anchor.setTo(0.5)

	this.playBtn = this.game.add.button(this.game.world.centerX - 20,
					    this.game.world.centerY + 100,
					    'play_button',
					    this.playPressed,
					    this,
					    0,
					    1,
					    2);
	this.playBtn.anchor.setTo(0.5)

	this.menuGrp = this.add.group()
	this.menuGrp.add(this.title)
	this.menuGrp.add(this.playBtn)
    }

    playPressed () {
	this.state.start('Game');
    }
}
