import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TestContainer } from './Test.styled';

export const CANVAS_SIZE = { x: 600, y: 600 };
export const SNAKE_START = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const APPLE_START = { x: 8, y: 3 };
export const SCALE = 30;
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

    const loop = useCallback(time => {
        if (previousTime.current !== undefined) {
            const deltaTime = time - previousTime.current;
            update(deltaTime);
        }

        previousTime.current = time;
        requestID.current = requestAnimationFrame(loop);
    }, [update]);

    useEffect(() => {
        requestID.current = requestAnimationFrame(loop);

        return () => {
            if (requestID.current) {
                cancelAnimationFrame(requestID.current);
            }
        };
    }, [loop]);
};

export interface ICoords {
    x: number;
    y: number;
}

const Test = () => {
    // Canvas
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // Default position
    const [snake, setSnake] = useState<Array<ICoords>>(SNAKE_START);
    const [apple, setApple] = useState<ICoords>(APPLE_START);

    const snakeDirection = useRef<ICoords>(DIRECTION_START);
    const nextDirection = useRef<ICoords[]>([]);
    const [speed, setSpeed] = useState<number | null>(null);

    // Game state
    const [points, setPoints] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>();

    const timer = useRef<number>(0);

    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const draw = useCallback(() => {
        const context = canvasRef.current?.getContext('2d');
        if (context == null) throw new Error('Could not get context');
        context.setTransform(SCALE, 0, 0, SCALE, 0, 0);
        context.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);
        // Draw Snake
        context.fillStyle = 'green';
        snake.forEach(({ x, y }) => context.fillRect(x, y, 1, 1));
        // Draw Apple
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, 1, 1);
    }, [snake, apple]);

    /*
    useEffect(() => {
        draw();
    }, [draw, snake, apple]);
    */

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

    const gameLoop = () => {
        const snakeCopy = [...snake]; // Create shallow copy to avoid mutating array

        let direction = nextDirection.current.shift();
        while (direction && !(direction.x + snakeDirection.current.x) && !(direction.y + snakeDirection.current.y)) {
            direction = nextDirection.current.shift();
        }
        if (!direction) {
            direction = snakeDirection.current;
        }

        snakeDirection.current = direction;

        const newSnakeHead: ICoords = {
            x: snakeCopy[0].x + direction.x,
            y: snakeCopy[0].y + direction.y,
        };
        snakeCopy.unshift(newSnakeHead);
        if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();
        if (checkCollision(newSnakeHead, snakeCopy.slice(1))) endGame();

        setSnake(snakeCopy);
    };

    const checkCollision = (piece: ICoords, snoko: ICoords[] = snake) => {
        // Wall Collision Detection
        if (
            piece.x * SCALE >= CANVAS_SIZE.x ||
            piece.x < 0 ||
            piece.y * SCALE >= CANVAS_SIZE.y ||
            piece.y < 0
        ) {
            return true;
        }

        // Snake Collision Detection
        for (const segment of snoko) {
            if (piece.x === segment.x && piece.y === segment.y) return true;
        }

        return false;

    };

    const update = (dt: number) => {
        timer.current += dt;
        if (speed && timer.current > speed) {
            timer.current = 0;
            gameLoop();
        }
    };

    useFrameLoop((dt) => {
        update(dt);
        draw();
        //console.log(1/dt * 1000);
    });

    const startGame = () => {
        setIsPlaying(true);
        setSnake(SNAKE_START);
        setApple(APPLE_START);
        setSpeed(INITIAL_SPEED);
        setGameOver(false);
        setPoints(0);
        snakeDirection.current = DIRECTION_START;
        nextDirection.current = [];
    };

    const endGame = () => {
        setIsPlaying(false);
        setSpeed(null);
        setGameOver(true);
    };

    const checkAppleCollision = (newSnake: ICoords[]) => {
        if (newSnake[0].x === apple.x && newSnake[0].y === apple.y) {
            let newApple = createRandomApple();
            while (checkCollision(newApple, newSnake)) {
                newApple = createRandomApple();
            }
            setApple(newApple);
            setPoints(points + 1);
            return true;
        }
        return false;
    };

    const createRandomApple = () => {
        return {
            x: Math.floor((Math.random() * CANVAS_SIZE.x - 10) / SCALE),
            y: Math.floor((Math.random() * CANVAS_SIZE.y - 10) / SCALE),
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

export default Test;
