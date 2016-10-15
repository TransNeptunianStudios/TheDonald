import Level from './level'
import Opponent from './opponent'
import Debate from './debate'

export default class PrideParty extends Level {
  constructor(game) {
    super(game)
    this.background = 'prideCorridor'
    this.opponent = new Opponent(game);
  }

  doWalk() {
    this.trump.doDebateWalk();
    this.trump.onReadyForDebate.addOnce(()=>{
      this.startDebate()
    }, this)
  }

  startDebate() {
    let debate = new Debate(this.game, this.trump, this.opponent)
    debate.onDebateComplete.addOnce(()=>{
      this.trump.doRestOfWalk()
    }, this)
    debate.runDebate()
  }
}
