import * as Phaser from 'phaser'
import Snake, { BodyPart } from '../Snake'

export const GAME_SCENE = 'Game'

class GameScene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    snake: Snake<Phaser.GameObjects.Rectangle>

    preload() {

    }

    create() {
        this.snake = new Snake(this, 300, 250)

        this.physics.world.on('worldbounds', this.handleSnakeWorldCollision, this)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    handleSnakeWorldCollision(body: Phaser.Physics.Arcade.Body, up: boolean, down: boolean, left: boolean, rigth: boolean) {
        if ( this.snake.matches( part => part.body.body === body) ) {
            this.snake.die()
        }
    }

    update() {
        if (this.snake.alive) {
            this.handleCursors()
        }
        this.snake.update()
    }

    private handleCursors() {
        if (this.cursors.right.isDown) {
            this.snake.turnRight()
        }
        if (this.cursors.left.isDown) {
            this.snake.turnLeft()
        }
        if (this.cursors.up.isDown) {
            this.snake.turnUp()
        }
        if (this.cursors.down.isDown) {
            this.snake.turnDown()
        }
    }
}

export default GameScene
