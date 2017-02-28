import Phaser from 'phaser'

export default class Bubble extends Phaser.Group {
    constructor(game, x, y, type, w=50, h=150, text= "Croatoan!") {
	super(game)
	var sprite = this.create(0, 0, 'thought_bubble');
	if(type == "Speach")
	    create_speach_bubble()
	else if(type == "Thought")
	    create_thought_bubble()
    }

    create_speach_bubble() {

    }

    create_thought_bubble() {

    }
}
