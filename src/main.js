import 'pixi'
import 'p2'
import Phaser from 'phaser'

import BootState from './boot'
import SplashState from './splash'
import MainMenuState from './mainmenu'
import GameState from './game'

class Game extends Phaser.Game {

  constructor () {
    let width = document.documentElement.clientWidth > 854 ? 854 : document.documentElement.clientWidth
    let height = document.documentElement.clientHeight > 480 ? 480 : document.documentElement.clientHeight

    super(width, height, Phaser.AUTO, 'content', null)

    this.state.add('Boot', BootState, false)
    this.state.add('Splash', SplashState, false)
    this.state.add('MainMenu', MainMenuState, false)
    this.state.add('Game', GameState, false)

    this.state.start('Boot')
  }
}

window.game = new Game()
