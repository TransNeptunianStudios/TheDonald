/* globals __DEV__ */
import Phaser from 'phaser'
import Trump from './trump'
import Elevator from './elevator'
import Bubble from './bubble'
import Quote from './quote'

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

	var skipButton = this.game.add.button(400,
					      460,
					      'skip_button',
					      this.startGame,
					      this);
	this.midGroup.add(skipButton)
	this.runStreet()
	//this.runLobby()
    }

    runStreet () {
	this.streetGubbe = this.midGroup.create(680, 250, 'street_gubbe')
	this.trump.walkDirection(640, 0).onComplete.add(()=>{
	    this.trump.walkDirection(0, -20).onComplete.add(()=>{
		game.add.audio('door_open').play()
		this.game.camera.fade('#000000');
		this.game.camera.onFadeComplete.addOnce(()=>{
		    this.streetGubbe.destroy()
		    this.runLobby()
		}, this)
	    }, this)
	}, this)

    }

    runLobby() {
	this.backGroup.create(0, 0, 'lobby')
	this.elevator = new Elevator(game, this.game.width-80, 341, this.backGroup, this.midGroup)

	this.pam = this.midGroup.create(460, 330, 'pam')
	this.pam.animations.add('talk', [1, 2, 3, 4, 5], 10, true)
	this.pam.frame = 0
	this.pamBubble = new Bubble(this.game, this.x, this.y, 'right')

	this.trump.position.setTo(200, 360)

	this.game.camera.flash();

	this.trump.walkDirection(0, 70).onComplete.add(()=>{
	    this.trump.walkDirection(210, 0).onComplete.add(()=>{
		this.pam.animations.play('talk')
		this.pamBubble.create_speach(this.pam.x+30, this.pam.y+90, 'How are we feeling today Donald?')
		this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
		    this.pam.animations.stop();
		    this.pam.frame = 0
		    this.pamBubble.remove()
		    this.tryAnswer()
		}, this)
	    }, this)
	}, this)
    }

    tryAnswer(){
	var q = new Quote(this.game, "My life has not been about losing".split(' '))
	q.runQuote()
	this.trump.show_thought_bubble(q.words)

	q.onQuoteComplete.addOnce((actualwords, targetWords) => {
	    var sentence = actualwords.join(" ")
	    var target = targetWords.join(" ")
	    this.trump.remove_thought_bubble()
	    this.trump.talk(sentence, target)
	    this.game.time.events.add(Phaser.Timer.SECOND * 4, this.evaluate, this, actualwords, targetWords);
	}, this)
    }

    evaluate(actualwords, targetWords){
	if( actualwords ){
	    var actual = actualwords.join(" ")
	    var target = targetWords.join(" ")
	    console.log("Actual: " + actual)
	    console.log("Target: " + target)
	}

	this.trump.shut_up()

	if (!actual || actual != target)
	{
	    this.pam.animations.play('talk')
	    this.pamBubble.create_speach(this.pam.x+30, this.pam.y+90, 'Try harder Donald, your my little winner!')
	    this.game.time.events.add(Phaser.Timer.SECOND * 3, () => {
		this.pam.animations.stop();
		this.pam.frame = 0
		this.pamBubble.remove()
		this.tryAnswer()
	    }, this)
}
else
    this.byePam()
}

byePam(){
    this.trump.walkDirection(360, 0).onComplete.add(()=>{
	this.trump.walkDirection(0, -65).onComplete.add(()=>{
	    this.callElevator()
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
    this.elevator.onDoorClose.addOnce(this.startGame, this)
}

update () {
    this.midGroup.sort('y', Phaser.Group.SORT_ASCENDING);
}

startGame () {
    this.game.camera.fade('#000000');
    this.game.camera.onFadeComplete.addOnce(()=>{
	this.state.start('Game');
    }, this)
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
