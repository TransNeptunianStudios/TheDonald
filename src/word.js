import Phaser from 'phaser'
import TextButton from './textbutton'

export default class Word {
    constructor(game, word) {
	this.game = game
	this.word = word
	this.onWordPressed = new Phaser.Signal()

	this.text = new Phaser.Text(
	    game,
	    0, // The position will be set later
	    0,
	    '   ' + this.word + '   ',
	    {
		font: '16px Verdana',
		//fill: '#000000',
		//backgroundColor: 'rgba(0,255,0,0.25)'
	    })

	this.text.anchor.set(0.5)

	this.text.inputEnabled = true
    }

    runWord(x, y) {
	this.text.x = x
	this.text.y = y

	this.game.add.existing(this.text)

	this.text.events.onInputDown.addOnce(() => {
	    this.onWordPressed.dispatch()
	    this.text.destroy()
	})
    }

    remove(){
	this.text.destroy()
    }
}
