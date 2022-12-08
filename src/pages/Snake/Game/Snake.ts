import { Direction, ICoords } from 'src/pages/Snake/Game/type';
import { BASE_UNIT, DIRECTION_START, GRID_SIZE, INITIAL_SPEED, SNAKE_START } from 'src/pages/Snake/Snake';
import Game from 'src/pages/Snake/Game/Game';

class Snake {
    public body: Array<ICoords> = [...SNAKE_START];
    public direction: ICoords = DIRECTION_START;
    public nextDirections: Array<ICoords> = [];
    public previousTailDirection: ICoords = DIRECTION_START;
    private game: Game;
    private justEat: boolean = false;

    public constructor(game: Game) {
        this.game = game;
        window.addEventListener('keydown', this.moveSnake);
    };

    public dispose = () => {
        window.removeEventListener('keydown', this.moveSnake);
    };

    public collidesWith = (piece: ICoords): boolean => {
        for (const snakePiece of this.body) {
            if (piece.x === snakePiece.x && piece.y === snakePiece.y) return true;
        }
        return false;
    };

    public update = (dt: number) => {
        const tail = this.body[this.body.length - 1];
        const pretail = this.body[this.body.length - 2];

        this.previousTailDirection = {
            x: this.body[this.body.length - 2].x - tail.x,
            y: pretail.y - tail.y,
        };

        let direction = this.nextDirections.shift();
        while (direction && !(direction.x + this.direction.x) && !(direction.y + this.direction.y)) {
            direction = this.nextDirections.shift();
        }
        this.direction = direction || this.direction;

        const newSnakeHead: ICoords = {
            x: (this.body[0].x + this.direction.x + GRID_SIZE.x) % GRID_SIZE.x,
            y: (this.body[0].y + this.direction.y + GRID_SIZE.y) % GRID_SIZE.y,
        };

        this.body.unshift(newSnakeHead);
        if (this.headCollidesWith(this.game.apple)) {
            this.justEat = true;
            this.game.incrementPoint();
            this.game.generateNewApple();
        } else {
            this.justEat = false;
            this.body.pop();
        }
        if (this.collides(newSnakeHead, this.body.slice(1))) {
            this.game.endGame();
        }
    };

    public render(dt: number, timer: number) {
        this.game.context.fillStyle = 'green';
        for (let i = 1; i < this.body.length; i++) {
            let { x, y } = this.body[i];
            this.game.context.fillRect(x * BASE_UNIT, y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
        }

        const where = timer / (this.game.speed || INITIAL_SPEED);

        // Head
        const head = this.body[0];
        switch (this.direction) {
        case Direction.ArrowUp: {
            this.game.context.fillRect(head.x * BASE_UNIT, (head.y + 1) * BASE_UNIT, BASE_UNIT, -BASE_UNIT * where);
            break;
        }
        case Direction.ArrowDown: {
            this.game.context.fillRect(head.x * BASE_UNIT, head.y * BASE_UNIT, BASE_UNIT, BASE_UNIT * where);
            break;
        }
        case Direction.ArrowLeft: {
            this.game.context.fillRect((head.x + 1) * BASE_UNIT, head.y * BASE_UNIT, -BASE_UNIT * where, BASE_UNIT);
            break;
        }
        case Direction.ArrowRight: {
            this.game.context.fillRect(head.x * BASE_UNIT, head.y * BASE_UNIT, BASE_UNIT * where, BASE_UNIT);
            break;
        }
        default:
            break;
        }

        // Tail
        let tail = this.body[this.body.length - (this.justEat ? 2 : 1)];

        // UP
        if (this.previousTailDirection.x === 0 && this.previousTailDirection.y === -1) {
            this.game.context.fillRect(tail.x * BASE_UNIT, (tail.y + 1) * BASE_UNIT, BASE_UNIT, BASE_UNIT * (1 - where));
            // DOWN
        } else if (this.previousTailDirection.x === 0 && this.previousTailDirection.y === 1) {
            this.game.context.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT, -BASE_UNIT * (1 - where));
            // LEFT
        } else if (this.previousTailDirection.x === -1 && this.previousTailDirection.y === 0) {
            this.game.context.fillRect((tail.x + 1) * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT * (1 - where), BASE_UNIT);
            // RIGHT
        } else if (this.previousTailDirection.x === 1 && this.previousTailDirection.y === 0) {
            this.game.context.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, -BASE_UNIT * (1 - where), BASE_UNIT);
        }

        if (this.justEat) {
            this.game.context.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
        }
    }

    private moveSnake = (event: KeyboardEvent) => {
        const { key } = event;
        this.nextDirections.push(Direction[key]);
        if (this.nextDirections.length > 3) {
            this.nextDirections.shift();
        }
    };

    private collides = (piece: ICoords, snake: Array<ICoords>): boolean => {
        for (const snakePiece of snake) {
            if (piece.x === snakePiece.x && piece.y === snakePiece.y) return true;
        }
        return false;
    };

    private headCollidesWith = (piece: ICoords): boolean => {
        return (this.body[0].x === piece.x && this.body[0].y === piece.y);
    };
}

export default Snake;
