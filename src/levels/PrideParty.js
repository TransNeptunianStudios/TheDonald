import Level from '../levels/Level'
import Debate from '../objects/Debate'

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
    let debate = new Debate(this.game, [], [])
    debate.onDebateComplete.addOnce(()=>{
      this.trump.doRestOfWalk()
    }, this)
    debate.runDebate()
  }
}
