import Level from './level'
import Opponent from './opponent'

export default class PrideParty extends Level {
  constructor(game, trump) {
    super(game, trump)
    this.background = 'baseCorridor'
    this.opponent = new Opponent(game);
  }

  doWalk() {
    this.trump.doDebateWalk();
    this.trump.onReadyForDebate.addOnce(()=>{
      this.startDebate()
    }, this)
  }
}
