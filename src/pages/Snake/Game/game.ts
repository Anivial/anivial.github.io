import { ICoords } from 'src/pages/Snake/Game/type';
import Snake from 'src/pages/Snake/Game/snake';
import {
    APPLE_START,
    BASE_UNIT,
    CANVAS_SIZE,
    DIRECTION_START,
    GRID_SIZE,
    INITIAL_SPEED,
    SCALE,
    SNAKE_START
} from 'src/pages/Snake/Snake';

class Game {
    static canvas: HTMLCanvasElement;
    static context: CanvasRenderingContext2D;

    public forceUpdate: () => void;
    public point: number = 0;
    public speed: number | null = null;
    public apple: ICoords = APPLE_START;
    public isPlaying: boolean = false;
    public gameOver: boolean = false;
    private timer: number = 0;
    private snake: Snake = new Snake(this);

    constructor(forceUpdate: () => void) {
        this.forceUpdate = forceUpdate;
    }

    public incrementPoint = () => {
        this.point += 1;
        this.forceUpdate();
    };

    public createRandomApple = (): ICoords => {
        return {
            x: this.randomIntFromInterval(0, GRID_SIZE.x - 1),
            y: this.randomIntFromInterval(0, GRID_SIZE.y - 1),
        };
    };

    public endGame = () => {
        this.isPlaying = false;
        this.gameOver = true;
        this.speed = null;
        this.timer = 0;

        this.forceUpdate();
    };

    public startGame = () => {
        this.snake.direction = DIRECTION_START;
        this.snake.nextDirections = [];
        this.snake.body = [...SNAKE_START];
        this.snake.previousTailDirection = DIRECTION_START;
        this.apple = APPLE_START;
        this.speed = INITIAL_SPEED;
        this.timer = 0;
        this.isPlaying = true;
        this.gameOver = false;

        this.forceUpdate();
    };

    public generateNewApple = () => {
        let newApple = this.createRandomApple();
        while (this.snake.collidesWith(newApple)) {
            newApple = this.createRandomApple();
        }
        this.apple = newApple;
    };

    public update = (dt: number) => {
        if (this.speed !== null) {
            this.timer += dt;
            if (this.timer > this.speed) {
                this.timer = 0;
                this.loop(dt);
            }
        }
        this.render(dt, this.timer);
    };

    public loop = (dt: number) => {
        this.snake.update(dt);
    };

    public render(dt: number, timer: number) {
        Game.context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        Game.context.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);

        // Draw Apple
        Game.context.fillStyle = 'red';
        Game.context.fillRect(this.apple.x * BASE_UNIT, this.apple.y * BASE_UNIT, BASE_UNIT, BASE_UNIT);

        // Snake
        this.snake.render(dt, timer);
    }

    public dispose() {
        this.snake.dispose();
    }

    private randomIntFromInterval = (min: number, max: number): number => { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
}

export default Game;
