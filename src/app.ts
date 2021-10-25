import * as Phaser from 'phaser'
import GameScene from './scenes/Game'

const config : Phaser.Types.Core.GameConfig = {
  parent: 'phaser',
  width: 900,
  height: 700,
  backgroundColor: 0xffaaaa,
  type: Phaser.AUTO,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {
        y: 0
      }
    }
  },
  scene: GameScene
}

const game = new Phaser.Game(config)

