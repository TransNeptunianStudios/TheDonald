import Level from './level'
import Debate from './debate'

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
    let debate = new Debate(this.game, this.trump.quotes, [])
    debate.onDebateComplete.addOnce(()=>{
      this.trump.doRestOfWalk()
    }, this)
    debate.runDebate()
  }
}
