import Phaser from 'phaser'

export default class extends Phaser.State {
    init () {
	this.stage.backgroundColor = '#000000'
    }

    preload () {
	// Should these really be here?
	this.load.image('tnsLogo', './assets/images/tns-logo.png')

	// Office
	this.load.image('office_corridor', './assets/images/office/office_corridor.png')
	this.load.image('office_f1', './assets/images/office/office_buildings_foreground2.png')
	this.load.image('office_f2', './assets/images/office/office_buildings_foreground1.png')
	this.load.image('office_b1', './assets/images/office/office_buildings_background2.png')
	this.load.image('office_b2', './assets/images/office/office_buildings_background1.png')
	this.load.image('office_sky', './assets/images/office/office_sky.png')
	this.load.image('office_throne', './assets/images/office/office_throne.png')

	this.load.spritesheet('office_nuke', './assets/images/office/office_nuke.png', 145, 124)
	this.load.spritesheet('office_godzilla', './assets/images/office/office_godzilla.png', 194, 99)

	// Donaldstuff
	this.load.image('health_frame', './assets/images/donald/Confidence_meter_frame.png')
	this.load.spritesheet('thought_bubble', './assets/images/thoughts.png', 424, 237)
	this.load.spritesheet('trump', './assets/images/donald/trump.png', 50, 100)
        this.load.spritesheet('trump_game_over', './assets/images/donald/trump_death.png', 50, 150)

	// Menu stuff
	this.load.spritesheet('play_button', './assets/images/menu/play_button.png', 100, 50)
	this.load.spritesheet('replay_button', './assets/images/menu/replay_button.png', 144, 50)
	this.load.spritesheet('retry_button', './assets/images/menu/retry_button.png', 127, 50)
	this.load.image('menuBackground', './assets/images/menu/start_menu.png')
	this.load.image('title', './assets/images/menu/title.png')
	this.load.image('you_won_title', './assets/images/menu/you_won_title.png')
	this.load.spritesheet('timer', './assets/images/Timer86x93.png', 86, 93)

	// Base corridor stuff
	this.load.image('baseCorridor', './assets/images/base_corridor/base-corridor.png')
	this.load.image('elevator', './assets/images/base_corridor/elevator.png')
	this.load.image('elevator-door', './assets/images/base_corridor/elevator-door.png')
	this.load.image('elevator-button', './assets/images/base_corridor/elevator-button.png')
	this.load.image('hanging_lamp', './assets/images/base_corridor/hanging_lamp.png')
	this.load.image('plant', './assets/images/base_corridor/plant.png')

	// Eid party
	this.load.image('eid_flag', './assets/images/eid/eid_flag.png')
	this.load.image('eid_food', './assets/images/eid/eid_table.png')
	this.load.spritesheet('eid_main', './assets/images/eid/eid_main.png', 30, 94)
	this.load.image('eid_guest1', './assets/images/eid/Eid_guest1.png')
	this.load.image('eid_food2', './assets/images/eid/eid_table2.png')
	this.load.spritesheet('eid_guest2', './assets/images/eid/Eid_fat_guest35x86.png', 35, 86)

	// Pride corridor
	this.load.spritesheet('pride_main', './assets/images/pride/Pride_main.png', 50, 142)
	this.load.spritesheet('pride_kaj', './assets/images/pride/Pride_kaj.png', 44, 93)
	this.load.image('pride_flag', './assets/images/pride/Pride_flag.png')
	this.load.image('pride_symbol', './assets/images/pride/Pride_hbtq_symbol.png')
	this.load.image('pride_heart', './assets/images/pride/pride_heart_string.png')
	this.load.spritesheet('pride_kids', './assets/images/pride/Pride_baloon_kids103x73.png', 103, 73)
	this.load.spritesheet('pride_dancer', './assets/images/pride/pride_dancer53x113.png', 53, 113)

	// Science corridor
	this.load.spritesheet('science_main', './assets/images/science/Science_main.png', 45, 90)
	this.load.spritesheet('science_ape', './assets/images/science/ape.png', 133, 56)
	this.load.spritesheet('science_table', './assets/images/science/science_table155x91.png', 155, 91)
	this.load.spritesheet('science_guy', './assets/images/science/science_tube_guy63x102.png', 63, 102)

	// KKK corridor
	this.load.spritesheet('kkk_cross', './assets/images/kkk/cross.png', 126, 208)
	this.load.spritesheet('kkk_ladder', './assets/images/kkk/ladder.png', 196, 261)
	this.load.image('kkk_seller', './assets/images/kkk/seller.png')
	this.load.spritesheet('kkk_clansman_2', './assets/images/kkk/clansman_2.png', 80, 123)
	this.load.spritesheet('kkk_kids_and_dog', './assets/images/kkk/kids_and_dog.png', 133,73)
	this.load.spritesheet('kkk_clansman_1', './assets/images/kkk/clansman_1.png', 61, 110)

	// Church corridor
	this.load.spritesheet('preacher_man', './assets/images/church/church_main48x117.png', 48, 117)
	this.load.image('crusifix', './assets/images/church/church_crucifix.png')
	this.load.spritesheet('podium', './assets/images/church/church_preacher100x100.png', 100, 100)
	this.load.image('church_guests', './assets/images/church/church_goers.png')

	this.load.audio('elevatorBing', './assets/sounds/elevator_bing.mp3')
	this.load.audio('music', './assets/sounds/trump_elevator.mp3')
	this.load.audio('timer', './assets/sounds/trump_timer.mp3')

	this.load.audio('disco_music', './assets/sounds/trump_disco.mp3')
    }

    create () {
	this.logo = this.add.sprite(this.game.world.centerX, this.game.world.centerY, 'tnsLogo')
	this.logo.anchor.setTo(0.5)
	this.logo.alpha = 0

	// Start fade in of TNS logo
	let fadeInTween = this.game.add.tween(this.logo).to({alpha: 1}, 2000, Phaser.Easing.Linear.None, true)
	fadeInTween.onComplete.add(()=>{
	    // Wait one second with full alpha
	    this.game.time.events.add(Phaser.Timer.SECOND * 1, ()=>{
		// Start to fade out
		let fadeOutTween = this.game.add.tween(this.logo).to({alpha: 0}, 2000, Phaser.Easing.Linear.None, true)
		fadeOutTween.onComplete.add(()=>{
		    this.state.start('MainMenu')
		}, this)
	    }, this)
	})


	var music = game.add.audio('music');

	music.play();

	this.game.input.onDown.add(()=>{
            this.state.start('MainMenu')
	}, this)
    }
}
