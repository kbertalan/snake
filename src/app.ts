import * as Phaser from 'phaser'
import GameScene from './scenes/Game'

const config : Phaser.Types.Core.GameConfig = {
  parent: 'phaser',
  width: 800,
  height: 600,
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

export default new Phaser.Game(config)

// parcel dev hot reload
if (module.hot) {
  module.hot.dispose(() => {
    document.getElementById('phaser').innerHTML = ''
  })
}