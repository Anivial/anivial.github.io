import { Direction, ICoords } from 'src/pages/Snake/Game/type';
import { BASE_UNIT, GRID_SIZE, INITIAL_SPEED, SNAKE_START } from 'src/pages/Snake/Snake';
import Game from 'src/pages/Snake/Game/Game';

export enum State {
    ALIVE,
    DEAD,
}

type SnakeParams = {
    ai?: boolean;
    color?: string;
    speed?: number;
    defaultBody?: Array<ICoords>;
    defaultDirection?: ICoords;
}

class Snake {
    public body: Array<ICoords> = [...SNAKE_START];
    public direction: ICoords;
    public nextDirections: Array<ICoords> = [];
    public previousTailDirection: ICoords;
    public state: State = State.ALIVE;
    private game: Game;
    private justEat: boolean = false;
    private timer: number = 0;
    private readonly speed: number;
    private readonly ai: boolean;
    private readonly color;
    private readonly defaultBody: Array<ICoords>;
    private readonly defaultDirection: ICoords;

    public constructor(game: Game, options: SnakeParams = {}) {
        const {
            ai = false,
            color = 'green',
            speed = INITIAL_SPEED,
            defaultBody = SNAKE_START,
            defaultDirection = Direction.ArrowUp,
        } = options;

        this.game = game;
        this.ai = ai;
        this.color = color;
        this.speed = speed;
        this.defaultBody = defaultBody;
        this.defaultDirection = defaultDirection;
        if (!this.ai) {
            window.addEventListener('keydown', this.moveSnake);
        }

        this.reset();
    };

    public dispose = () => {
        if (!this.ai) {
            window.removeEventListener('keydown', this.moveSnake);
        }
    };

    public collidesWith = (piece: ICoords): boolean => {
        for (const snakePiece of this.body) {
            if (piece.x === snakePiece.x && piece.y === snakePiece.y) return true;
        }
        return false;
    };

    public reset = () => {
        this.body = [...this.defaultBody];
        this.direction = this.defaultDirection;
        this.previousTailDirection = this.defaultDirection;
        this.nextDirections = [];
        this.state = State.ALIVE;
    };

    public move = (): void => {
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
            this.state = State.DEAD;
        }
        for (const snake of this.game.snakes) {
            if (snake !== this && snake.state === State.ALIVE && this.collides(newSnakeHead, snake.body)) {
                this.state = State.DEAD;
            }
        }
    };

    public loop = (): void => {
        if (this.ai) {
            this.aiMove();
        }
        this.move();
    };

    public dist = (piece1: ICoords, piece2: ICoords): number => {
        return Math.min(
            (piece1.x - piece2.x + GRID_SIZE.x) % GRID_SIZE.x,
            Math.abs(piece1.x - piece2.x),
        ) + Math.min(
            (piece1.y - piece2.y + GRID_SIZE.y) % GRID_SIZE.y,
            Math.abs(piece1.y - piece2.y),
        );
    };

    public update = (dt: number) => {
        if (this.state === State.DEAD) {
            return;
        }

        this.timer += dt;
        if (this.timer > this.speed) {
            this.timer = 0;
            this.loop();
        }
    };

    public render(dt: number) {
        if (this.state === State.DEAD && this.game.snakes.length > 1) {
            return;
        }
        this.game.context.fillStyle = this.color;
        for (let i = 1; i < this.body.length; i++) {
            let { x, y } = this.body[i];
            this.game.context.fillRect(x * BASE_UNIT, y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
        }

        const where = this.timer / this.speed;

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

    private aiMove = (): void => {
        const head = this.body[0];

        const lst = [
            [{
                x: (head.x + Direction.ArrowUp.x) % GRID_SIZE.x,
                y: (head.y + Direction.ArrowUp.y % GRID_SIZE.y)
            }, Direction.ArrowUp],
            [{
                x: (head.x + Direction.ArrowDown.x) % GRID_SIZE.x,
                y: (head.y + Direction.ArrowDown.y % GRID_SIZE.y)
            }, Direction.ArrowDown],
            [{
                x: (head.x + Direction.ArrowLeft.x) % GRID_SIZE.x,
                y: (head.y + Direction.ArrowLeft.y % GRID_SIZE.y)
            }, Direction.ArrowLeft],
            [{
                x: (head.x + Direction.ArrowRight.x) % GRID_SIZE.x,
                y: (head.y + Direction.ArrowRight.y % GRID_SIZE.y)
            }, Direction.ArrowRight],
        ];

        let availibleDirs = lst.filter(i => {
            for (const snake of this.game.snakes) {
                if (snake.state === State.ALIVE) {
                    for (const piece of snake.body) {
                        if (i[0].x === piece.x && i[0].y === piece.y) {
                            return false;
                        }
                    }
                }
            }
            return true;
        });

        availibleDirs = availibleDirs
        .map(value => ({ value, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(({ value }) => value);

        let res;

        if (availibleDirs.length === 0) {
            res = Direction.ArrowUp;
        } else {
            res = availibleDirs.sort((a, b) => this.dist(a[0], this.game.apple) - this.dist(b[0], this.game.apple))[0][1];
        }

        this.nextDirections = [res];
    };

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
