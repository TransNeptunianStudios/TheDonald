import Level from './level'

export default class kkkMeeting extends Level {
  constructor(game, trump) {
    super(game, trump)
      this.background = 'baseCorridor'
  }

    start() {
	super.start()
	var cross = this.midGroup.create(this.game.width/2, 300, 'cross')
	cross.anchor.setTo(0.5)
	cross.animations.add('burn')
	cross.animations.play('burn', 10, true)

	var clansman = this.midGroup.create(this.game.width/2-100, 330, 'clansman')
	clansman.anchor.setTo(0.5)
	clansman.animations.add('stand', [0, 1])
	clansman.animations.play('stand', 5, true)

	var ladder = this.midGroup.create(125, 220, 'kkk_ladder')
	ladder.anchor.setTo(0.5)

	var seller = this.midGroup.create(650, 320, 'kkk_seller')
	seller.anchor.setTo(0.5)

    }
}
