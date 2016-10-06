import Level from '../levels/Level'

export default class PrideParty extends Level {
  constructor(game) {
    super(game)
    this.background = 'prideCorridor'
  }

  doWalk() {
    this.trump.onWalkToPercentComplete.addOnce(()=>{
      this.startDebate()
    }, this)
    this.trump.doWalkToPercent(0.5)
  }

  startDebate() {
    console.log('Start debate')
    this.trump.doRestOfWalk()
  }
}
