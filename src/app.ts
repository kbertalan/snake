import * as Phaser from 'phaser'

const preload = () => {}
const create = () => {
//  this.add.line(0, 0, 600, 500, 0xfffff, 1)
}
const update = () => {}

const config = {
  parent: 'phaser',
  width: 600,
  height: 500,
  type: Phaser.AUTO,
  scene: {
    preload,
    create,
    update
  }
}

const game = new Phaser.Game(config)

