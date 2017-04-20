import Phaser from 'phaser'

export default class extends Phaser.State {
    preload() {
	// set background color and preload image
	this.game.stage.backgroundColor = '#000000';
	this._preloadBar = this.game.add.sprite(game.world.centerX, game.world.centerY, 'preloaderBar');
	this._preloadBar.anchor.setTo(0.5)

	this.game.load.setPreloadSprite(this._preloadBar);

	this.load.image('tnsLogo', './assets/images/tns-logo.png')

	// Office
	this.load.image('office_corridor', './assets/images/office/office_corridor.png')
	this.load.image('office_f1', './assets/images/office/office_buildings_foreground2.png')
	this.load.image('office_f2', './assets/images/office/office_buildings_foreground1.png')
	this.load.image('office_b1', './assets/images/office/office_buildings_background2.png')
	this.load.image('office_b2', './assets/images/office/office_buildings_background1.png')
	this.load.image('office_sky', './assets/images/office/office_sky.png')
	this.load.image('disco_lights', './assets/images/office/disco_lights.png')
	this.load.image('office_throne', './assets/images/office/office_throne.png')
	this.load.spritesheet('office_discoball', './assets/images/office/office_disco_ball.png', 50, 100)
	this.load.spritesheet('office_nuke', './assets/images/office/office_nuke.png', 145, 124)
	this.load.spritesheet('office_godzilla', './assets/images/office/office_godzilla.png', 194, 99)

	// IntroStuff
	this.load.image('street', './assets/images/street/street_base.png')
	this.load.image('lobby', './assets/images/lobby/lobby_base.png')
	this.load.image('skip_button', './assets/images/menu/intro_skip.png')
	this.load.image('street_gubbe', './assets/images/street/street_door_man.png')
	this.load.spritesheet('pam', './assets/images/lobby/lobby_receptionist30x95.png', 30, 95)
	this.load.image('street_cab', './assets/images/street/street_cab.png')

	// Donaldstuff
	this.load.image('health_frame', './assets/images/donald/Confidence_meter_frame.png')
	this.load.spritesheet('thought_bubble', './assets/images/thoughts.png', 424, 237)
	this.load.spritesheet('trump', './assets/images/donald/trump.png', 50, 100)
	this.load.spritesheet('minitrump', './assets/images/donald/Donald_mini17x32.png', 17,32)
        this.load.spritesheet('trump_game_over', './assets/images/donald/trump_death.png', 50, 150)
	this.load.spritesheet('trump_desolves', './assets/images/donald/Donald_disolves89x100.png', 89, 100)

	// Menu stuff
	this.load.spritesheet('play_button', './assets/images/menu/play_button.png', 100, 50)
	this.load.spritesheet('replay_button', './assets/images/menu/replay_button.png', 144, 50)
	this.load.spritesheet('retry_button', './assets/images/menu/retry_button.png', 127, 50)
	this.load.image('menuBackground', './assets/images/menu/start_menu.png')
	this.load.image('title', './assets/images/menu/title.png')
	this.load.image('you_won_title', './assets/images/menu/you_won_title.png')
	this.load.spritesheet('timer', './assets/images/Timer86x93.png', 86, 93)
	this.load.spritesheet('mute', './assets/images/menu/menu_volume_mute43x51.png', 43, 51)
	this.load.image('credits', './assets/images/menu/menu_gold_credtis.png')
	this.load.image('sky', './assets/images/menu/sky_complete.png')
	this.load.image('bigDonald', './assets/images/menu/Big_Donald.png')
	this.load.image('skyline', './assets/images/menu/menu_skyline.png')

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
	this.load.spritesheet('eid_guest2', './assets/images/eid/Eid_fat_guest35x86.png', 37, 88)

	// Pride corridor
	this.load.spritesheet('pride_main', './assets/images/pride/Pride_main.png', 50, 142)
	this.load.spritesheet('pride_kaj', './assets/images/pride/Pride_kaj.png', 44, 93)
	this.load.image('pride_flag', './assets/images/pride/Pride_flag.png')
	this.load.image('pride_symbol', './assets/images/pride/Pride_hbtq_symbol.png')
	this.load.image('pride_heart', './assets/images/pride/pride_heart_string.png')
	this.load.spritesheet('pride_kids', './assets/images/pride/Pride_baloon_kids103x73.png', 104, 73)
	this.load.spritesheet('pride_dancer', './assets/images/pride/pride_dancer53x113.png', 53, 113)
	this.load.image('pride_table', './assets/images/pride/pride_table.png')

	// Science corridor
	this.load.spritesheet('science_main', './assets/images/science/Science_main.png', 45, 90)
	this.load.spritesheet('science_ape', './assets/images/science/ape.png', 133, 56)
	this.load.spritesheet('science_table', './assets/images/science/science_table155x91.png', 155, 91)
	this.load.spritesheet('science_guy', './assets/images/science/science_tube_guy63x102.png', 63, 102)
	this.load.image('planet', './assets/images/science/science_planet.png')
	this.load.image('whiteBoard', './assets/images/science/science_white_board.png')

	// KKK corridor
	this.load.spritesheet('kkk_cross', './assets/images/kkk/cross.png', 126, 208)
	this.load.spritesheet('kkk_ladder', './assets/images/kkk/ladder.png', 196, 261)
	this.load.image('kkk_seller', './assets/images/kkk/seller.png')
	this.load.spritesheet('kkk_clansman_2', './assets/images/kkk/clansman_2.png', 80, 123)
	this.load.spritesheet('kkk_kids_and_dog', './assets/images/kkk/kids_and_dog.png', 135,73)
	this.load.spritesheet('kkk_clansman_1', './assets/images/kkk/clansman_1.png', 63, 110)

	// Church corridor
	this.load.spritesheet('preacher_man', './assets/images/church/church_main48x117.png', 48, 117)
	this.load.image('crusifix', './assets/images/church/church_crucifix.png')
	this.load.spritesheet('podium', './assets/images/church/church_preacher100x100.png', 100, 100)
	this.load.image('church_guests', './assets/images/church/church_goers.png')

	this.load.audio('elevatorBing', './assets/sounds/elevator_bing.mp3')
	this.load.audio('music', './assets/sounds/trump_elevator_new.mp3') // game
	this.load.audio('disco_music', './assets/sounds/trump_disco_new.mp3') // game complete
	this.load.audio('march_music', './assets/sounds/trump_march_new.mp3') // menu

	this.load.audio('blip', './assets/sounds/blip.wav') // menu
	this.load.audio('blip2', './assets/sounds/blip2.wav') // menu
	this.load.audio('hurt', './assets/sounds/hurt.wav') // menu

	this.load.audio('door_open', './assets/sounds/door_open.wav') // menu
    }

    create() {
	this.state.start('Splash')
    }
};
