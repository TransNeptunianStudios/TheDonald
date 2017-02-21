import Level from './level'

export default class kkkMeeting extends Level {
  constructor(game, trump) {
    super(game, trump)
      this.background = 'baseCorridor'
  }

    start() {
	super.start()
	var cross = this.midGroup.create(300, 200, 'cross')
	cross.animations.add('burn')
	cross.animations.play('burn', 10, true)
    }
}
