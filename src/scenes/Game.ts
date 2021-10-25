import * as Phaser from 'phaser'

export const GAME_SCENE = 'Game'

class GameScene extends Phaser.Scene {
    cursors: Phaser.Types.Input.Keyboard.CursorKeys
    snake: Phaser.GameObjects.Rectangle
    lives: boolean

    preload() {

    }

    create() {
        this.lives = true
        this.snake = this.add.rectangle(10, 10, 30, 30, 0xffffff, 1)
        this.snake.setOrigin(0,0)
        this.physics.add.existing(this.snake);

        const snakeBody = this.snake.body as Phaser.Physics.Arcade.Body
        snakeBody.setCollideWorldBounds(true, 0, 0, true)

        this.physics.world.on('worldbounds', this.handleSnakeWorldCollision, this)

        this.cursors = this.input.keyboard.createCursorKeys()
    }

    handleSnakeWorldCollision(body: Phaser.Physics.Arcade.Body, up: boolean, down: boolean, left: boolean, rigth: boolean) {
        if ( body === this.snake.body ) {
            this.lives = false
            this.snake.fillColor = 0x000000
        }
    }

    update() {
        if (this.lives) {
            this.handleCursors()
        }
        if (this.cursors.space.isDown && !this.lives) {
            this.lives = true
            this.snake.fillColor = 0xffffff
        }
    }

    private handleCursors() {
        if (this.cursors.right.isDown) {
            this.snake.body.velocity.x = 100
            this.snake.body.velocity.y = 0
        }
        if (this.cursors.left.isDown) {
            this.snake.body.velocity.x = -100
            this.snake.body.velocity.y = 0
        }
        if (this.cursors.up.isDown) {
            this.snake.body.velocity.y = -100
            this.snake.body.velocity.x = 0
        }
        if (this.cursors.down.isDown) {
            this.snake.body.velocity.y = 100
            this.snake.body.velocity.x = 0
        }
    }
}

export default GameScene
