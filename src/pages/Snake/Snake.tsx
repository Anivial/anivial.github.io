import React, { useEffect, useRef, useState } from 'react';
import { TestContainer } from './Snake.styled';

export const BASE_UNIT = 30;
export const GRID_SIZE = { x: 20, y: 20 };
export const CANVAS_SIZE = { x: GRID_SIZE.x * BASE_UNIT, y: GRID_SIZE.y * BASE_UNIT };
export const SNAKE_START = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const APPLE_START = { x: 8, y: 3 };
export const SCALE = 1;
export const INITIAL_SPEED = 100;
export const DIRECTION = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};
export const DIRECTION_START = DIRECTION.ArrowUp;

export const useFrameLoop = (update: (dt: number) => void) => {
    const requestID = useRef<number>();
    const previousTime = useRef<number>();

    useEffect(() => {
        const loop = (time) => {
            if (previousTime.current !== undefined) {
                const deltaTime = time - previousTime.current;
                update(deltaTime);
            }

            previousTime.current = time;
            requestID.current = requestAnimationFrame(loop);
        };

        requestID.current = requestAnimationFrame(loop);

        return () => {
            if (requestID.current) {
                cancelAnimationFrame(requestID.current);
            }
        };
    }, [update]);
};

export interface ICoords {
    x: number;
    y: number;
}

const Snake = () => {
    // Canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Default position
    const snake = useRef<Array<ICoords>>(SNAKE_START);
    const apple = useRef<ICoords>(APPLE_START);
    const justEat = useRef<boolean>(false);

    const snakeDirection = useRef<ICoords>(DIRECTION_START);
    const nextDirection = useRef<ICoords[]>([]);
    const previousTailDirection = useRef<ICoords>(DIRECTION_START);
    const speed = useRef<number | null>(null);

    // Game state
    const [points, setPoints] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>();

    const timer = useRef<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const canvas = canvasRef.current?.getContext('2d');

    const drawSnake = (snake: Array<ICoords>) => {
        if (!canvas) return;

        const where = timer.current / INITIAL_SPEED;

        // Draw Snake
        canvas.fillStyle = 'green';
        for (let i = 1; i < snake.length; i++) {
            let { x, y } = snake[i];
            canvas.fillRect(x * BASE_UNIT, y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
        }

        // Head
        const head = snake[0];
        switch (snakeDirection.current) {
        case DIRECTION.ArrowUp: {
            canvas.fillRect(head.x * BASE_UNIT, (head.y + 1) * BASE_UNIT, BASE_UNIT, -BASE_UNIT * where);
            break;
        }
        case DIRECTION.ArrowDown: {
            canvas.fillRect(head.x * BASE_UNIT, head.y * BASE_UNIT, BASE_UNIT, BASE_UNIT * where);
            break;
        }
        case DIRECTION.ArrowLeft: {
            canvas.fillRect((head.x + 1) * BASE_UNIT, head.y * BASE_UNIT, -BASE_UNIT * where, BASE_UNIT);
            break;
        }
        case DIRECTION.ArrowRight: {
            canvas.fillRect(head.x * BASE_UNIT, head.y * BASE_UNIT, BASE_UNIT * where, BASE_UNIT);
            break;
        }
        default:
            break;
        }

        // Tail

        let tail = snake[snake.length - (justEat.current ? 2 : 1)];

        // UP
        if (previousTailDirection.current.x === 0 && previousTailDirection.current.y === -1) {
            canvas.fillRect(tail.x * BASE_UNIT, (tail.y+1) * BASE_UNIT, BASE_UNIT, BASE_UNIT * (1-where));
        // DOWN
        } else if (previousTailDirection.current.x === 0 && previousTailDirection.current.y === 1) {
            canvas.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT, -BASE_UNIT * (1 - where));
        // LEFT
        } else if (previousTailDirection.current.x === -1 && previousTailDirection.current.y === 0) {
            canvas.fillRect((tail.x+1) * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT * (1 - where), BASE_UNIT);
        // RIGHT
        } else if (previousTailDirection.current.x === 1 && previousTailDirection.current.y === 0) {
            canvas.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, -BASE_UNIT * (1 - where), BASE_UNIT);
        }

        if (justEat.current) {
            canvas.fillRect(tail.x * BASE_UNIT, tail.y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
        }
    };

    const draw = () => {
        if (!canvas) return;

        canvas.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        canvas.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);

        // Draw Snake
        drawSnake(snake.current);

        // Draw Apple
        canvas.fillStyle = 'red';
        canvas.fillRect(apple.current.x * BASE_UNIT, apple.current.y * BASE_UNIT, BASE_UNIT, BASE_UNIT);
    };

    useEffect(() => {
        const moveSnake = (event: KeyboardEvent) => {
            const { key } = event;
            nextDirection.current.push(DIRECTION[key]);
            if (nextDirection.current.length > 3) {
                nextDirection.current.shift();
            }
        };

        window.addEventListener('keydown', moveSnake);

        return () => {
            window.removeEventListener('keydown', moveSnake);
        };
    }, [nextDirection, snakeDirection]);

    const randomIntFromInterval = (min: number, max: number): number => { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    };

    const gameLoop = () => {
        if (!speed.current) return;

        const tail = snake.current[snake.current.length - 1];
        const pretail = snake.current[snake.current.length - 2];

        previousTailDirection.current = {
            x: pretail.x - tail.x,
            y: pretail.y - tail.y,
        };

        const snakeCopy = [...snake.current]; // Create shallow copy to avoid mutating array

        let direction = nextDirection.current.shift();
        while (direction && !(direction.x + snakeDirection.current.x) && !(direction.y + snakeDirection.current.y)) {
            direction = nextDirection.current.shift();
        }
        if (!direction) {
            direction = snakeDirection.current;
        }

        snakeDirection.current = direction;

        const newSnakeHead: ICoords = {
            x: (snakeCopy[0].x + direction.x + GRID_SIZE.x) % GRID_SIZE.x,
            y: (snakeCopy[0].y + direction.y + GRID_SIZE.y) % GRID_SIZE.y,
        };

        snakeCopy.unshift(newSnakeHead);
        if (checkAppleCollision(snakeCopy)) {
            justEat.current = true;
        } else {
            justEat.current = false;
            snakeCopy.pop();
        }
        if (checkCollision(newSnakeHead, snakeCopy.slice(1))) endGame();

        snake.current = snakeCopy;
    };

    const checkCollision = (piece: ICoords, snoko: ICoords[] = snake.current) => {
        // Snake Collision Detection
        for (const segment of snoko) {
            if (piece.x === segment.x && piece.y === segment.y) return true;
        }

        return false;

    };

    const update = (dt: number) => {
        if (speed.current !== null) {
            timer.current += dt;
            if (timer.current > INITIAL_SPEED) {
                timer.current = 0;
                gameLoop();
            }
        }
    };

    useFrameLoop((dt) => {
        update(dt);
        draw();
    });

    const startGame = () => {
        snake.current = SNAKE_START;
        apple.current = APPLE_START;
        speed.current = INITIAL_SPEED;
        timer.current = 0;
        snakeDirection.current = DIRECTION_START;
        nextDirection.current = [];

        setIsPlaying(true);
        setGameOver(false);
        setPoints(0);
    };

    const endGame = () => {
        setIsPlaying(false);
        speed.current = null;
        timer.current = 0;
        setGameOver(true);
    };

    const checkAppleCollision = (newSnake: ICoords[]) => {
        if (newSnake[0].x === apple.current.x && newSnake[0].y === apple.current.y) {
            let newApple = createRandomApple();
            while (checkCollision(newApple, newSnake)) {
                newApple = createRandomApple();
            }
            apple.current = newApple;
            setPoints(points + 1);
            return true;
        }
        return false;
    };

    const createRandomApple = () => {
        return {
            x: randomIntFromInterval(0, GRID_SIZE.x - 1),
            y: randomIntFromInterval(0, GRID_SIZE.y - 1),
        };
    };

    return (
        <TestContainer>
            <canvas
                style={
                    gameOver
                        ? { border: '1px solid black', opacity: 0.5 }
                        : { border: '1px solid black' }
                }
                ref={canvasRef}
                width={CANVAS_SIZE.x}
                height={CANVAS_SIZE.y}
            />
            {gameOver && <div className="game-over">Game Over</div>}
            {!isPlaying && (
                <button className="start" onClick={startGame}>
                    Start Game
                </button>
            )}
            <p className="points">{points}</p>
        </TestContainer>
    );
};

export default Snake;
