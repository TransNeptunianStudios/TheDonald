import Phaser from 'phaser'

export default class Opponent extends Phaser.Sprite {
  constructor(game) {
    super(game, 500, 445, 'opponent')
    this.anchor.setTo(0.5, 1);

    this.waitingForAnswer = new Phaser.Signal()

    // while we use vickan graphics
    this.scale.setTo(2.5, 2.5)
    this.frame = 0
    this.animations.add('talk', [0, 1], 10, true)
    this.animations.add('collapse', [2, 3], 10, true)
  }

  reset() {
    if (this.displayText) {
      this.displayText.destroy()
    }
  }

  askQuestion(){
    let allQuestions = [ "What do you think about the midle-east?",
                         "Are you a feminist?",
                         "Do you approve of torture?"]
    allQuestions = Phaser.ArrayUtils.shuffle(allQuestions);

    let question = "...what?"
    if(allQuestions.length > 0)
      question = allQuestions.pop()

    this.displayText = this.game.add.text(this.x + 30,
                                  this.y - 50,
                                  question,
                                  {
                                    font: '18px Verdana',
                                    fill: '#ffffff',
                                    backgroundColor: 'rgba(0,255,0,0.25)'
                                  })

    this.animations.play('talk')

     // Ask question for 2 seconds
     this.game.time.events.add(Phaser.Timer.SECOND * 2, () => {
       this.animations.stop();
       this.frame = 0
       this.waitingForAnswer.dispatch()
     }, this)
  }
}
