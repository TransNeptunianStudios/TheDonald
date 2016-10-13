import Level from './level'
import Debate from './debate'

export default class PrideParty extends Level {
  constructor(game) {
    super(game)
    this.background = 'prideCorridor'
  }

  doWalk() {
    this.trump.doDebateWalk();
    this.trump.onReadyForDebate.addOnce(()=>{
      this.startDebate()
    }, this)
  }

  startDebate() {
    let debate = new Debate(this.game, this.trump.quotes, [])
    debate.onDebateComplete.addOnce(()=>{
      this.trump.doRestOfWalk()
    }, this)
    debate.runDebate()
  }
}
