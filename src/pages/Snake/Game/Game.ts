import { ICoords } from 'src/pages/Snake/Game/type';
import Snake, { State } from 'src/pages/Snake/Game/Snake';
import { APPLE_START, BASE_UNIT, CANVAS_SIZE, GRID_SIZE, SCALE, } from 'src/pages/Snake/Snake';

class Game {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    public forceUpdate: () => void;
    public point: number = 0;
    public speed: number | null = null;
    public apple: ICoords = APPLE_START;
    public isPlaying: boolean = false;
    public gameOver: boolean = false;
    public snakes: Array<Snake> = [];

    constructor(forceUpdate: () => void, canvas: HTMLCanvasElement) {
        this.forceUpdate = forceUpdate;
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (context) {
            this.context = context;
        }

        this.snakes.push(new Snake(this, true));
        this.snakes.push(new Snake(this, true));
        this.snakes.push(new Snake(this, true));

        forceUpdate();
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

        this.forceUpdate();
    };

    public startGame = () => {
        for (const snake of this.snakes) {
            snake.reset();
        }

        this.apple = APPLE_START;
        this.isPlaying = true;
        this.gameOver = false;
        this.point = 0;

        this.forceUpdate();
    };

    public generateNewApple = () => {
        let newApple = this.createRandomApple();
        while (this.snakes.some(snake => snake.collidesWith(newApple))) {
            newApple = this.createRandomApple();
        }
        this.apple = newApple;
    };

    public update = (dt: number) => {
        if (this.isPlaying) {
            for (const snake of this.snakes) {
                snake.update(dt);
            }
        }

        if (
            (this.snakes.length === 1 && this.snakes[0].state === State.DEAD)
            || (this.snakes.length > 1 && this.snakes.filter(snake => snake.state === State.DEAD).length === this.snakes.length - 1)
        ) {
            this.endGame();
        }

        this.render(dt);
    };

    public render(dt: number) {
        this.context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        this.context.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);

        // Draw Apple
        this.context.fillStyle = 'red';
        this.context.fillRect(this.apple.x * BASE_UNIT, this.apple.y * BASE_UNIT, BASE_UNIT, BASE_UNIT);

        // Snakes
        for (const snake of this.snakes) {
            snake.render(dt);
        }
    }

    public dispose() {
        for (const snake of this.snakes) {
            snake.dispose();
        }
    }

    private randomIntFromInterval = (min: number, max: number): number => { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };
}

export default Game;
