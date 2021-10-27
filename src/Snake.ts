const MAX_BODY_PARTS = 100

interface Direction {
    x: number
    y: number
}

export interface BodyPart {
    head: boolean
    x: number
    y: number
    body: Phaser.GameObjects.Rectangle
}

class Snake<T> {
    private _parts: BodyPart[]
    private _end: number
    private _alive: boolean
    private _scene: Phaser.Scene
    private _direction: Direction

    constructor(scene: Phaser.Scene, x: number, y: number) {
        this._scene = scene
        this._parts = new Array(MAX_BODY_PARTS)
        this._end = 1
        this._alive = true
        this._direction = { x: 0, y: 0 }
        this._parts[0] = this.createSnakePart(0, true, x, y)
        this._parts[1] = this.createSnakePart(1, false, x - 30, y)
    }

    public get alive() : boolean {
        return this._alive
    }

    update() {
        var previous = null
        for (let i = 0; i <= this._end; i++) {
            const element = this._parts[i];
            this._parts[i] = this.changeSnakePart(i, element, previous)
            previous = element
        }
    }
    
    die() {
        this._alive = false
        this._direction = { x:0, y:0 }
    }

    matches(_matcher: (part: BodyPart) => boolean) {
        for (let i = 0; i <= this._end; i++) {
            const element = this._parts[i];
            if (_matcher(element)) {
                return true
            }
        }

        return false
    }

    turnRight() {
        this._direction = { x: 5, y: 0 }
    }

    turnLeft() {
        this._direction = { x: -5, y: 0 }
    }

    turnUp() {
        this._direction = { x: 0, y: -5 }
    }

    turnDown() {
        this._direction = { x: 0, y: 5 }
    }

    color(head: boolean) {
        if (!this._alive) {
            return 0x000000
        }
        return head ? 0xaaffaa : 0xffffff
    }

    createSnakePart(index: number, head: boolean, x: number, y: number) {
        const rect = this._scene.add.rectangle(x, y, 30, 30, this.color(head), 1)
        rect.setOrigin(0,0)
        rect.setDepth(MAX_BODY_PARTS - index)
        this._scene.physics.add.existing(rect);
        const body = rect.body as Phaser.Physics.Arcade.Body
        body.setCollideWorldBounds(true, 0, 0, true)
        return {
            head,
            x,
            y,
            body: rect
        }
    }

    changeSnakePart(index: number, part: BodyPart, previous?: BodyPart) {
        const newPart = {
            head: part.head,
            x: previous
                ? previous.x
                : part.x + this._direction.x,
            y: previous 
                ? previous.y 
                : part.y + this._direction.y,
            body: part.body,
        }
        if (this._alive) {
            newPart.body.setX(newPart.x)
            newPart.body.setY(newPart.y)    
        }
        newPart.body.setFillStyle(this.color(newPart.head), 1)

        return newPart
    }
}

export default Snake