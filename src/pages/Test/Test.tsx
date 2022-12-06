import React, { useCallback, useEffect, useRef, useState } from 'react';
import { TestContainer } from './Test.styled';

export const canvas_size = { x: 600, y: 600 };
export const snake_start = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const direction_start = { x: 0, y: -1 };
export const apple_start = { x: 8, y: 3 };
export const scale = 40;
export const initial_speed = 100;
export const directions = {
    ArrowUp: { x: 0, y: -1 },
    ArrowDown: { x: 0, y: 1 },
    ArrowLeft: { x: -1, y: 0 },
    ArrowRight: { x: 1, y: 0 },
};

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
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const timer = useRef<number>(0);

    const [snake, setSnake] = useState<Array<ICoords>>(snake_start);
    const [apple, setApple] = useState<ICoords>(apple_start);
    const [speed, setSpeed] = useState<number | null>(null);
    const [points, setPoints] = useState<number>(0);
    const [gameOver, setGameOver] = useState<boolean>();

    const wrapperRef = useRef<HTMLDivElement>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const render = () => {
        const context = canvasRef.current?.getContext('2d');
        if (context == null) throw new Error('Could not get context');
        context.setTransform(scale, 0, 0, scale, 0, 0);
        context.clearRect(0, 0, canvas_size.x, canvas_size.y);
        // Draw Snake
        context.fillStyle = 'green';
        snake.forEach(({ x, y }) => context.fillRect(x, y, 1, 1));
        // Draw Apple
        context.fillStyle = 'red';
        context.fillRect(apple.x, apple.y, 1, 1);
    };

     useEffect(() => {
        render();
    }, [render, snake, apple]);

    const [direction, setDirection] = useState<ICoords>(direction_start);

    const moveSnake = (event: React.KeyboardEvent) => {
        const { key } = event;
        // Check if key is arrow key
        if (
            key === 'ArrowUp' ||
            key === 'ArrowDown' ||
            key === 'ArrowRight' ||
            key === 'ArrowLeft'
        ) {
            // disable backwards key, this means no collision when going right, and then pressing ArrowLeft
            if (
                direction.x + directions[key].x &&
                direction.y + directions[key].y
            ) {
                setDirection(directions[key]);
            }
        }
    };

    const gameLoop = () => {
        const snakeCopy = [...snake]; // Create shallow copy to avoid mutating array
        const newSnakeHead: ICoords = {
            x: snakeCopy[0].x + direction.x,
            y: snakeCopy[0].y + direction.y,
        };
        snakeCopy.unshift(newSnakeHead);

        if (checkCollision(newSnakeHead)) endGame();
        if (!checkAppleCollision(snakeCopy)) snakeCopy.pop();

        setSnake(snakeCopy);
    };

    const checkCollision = (piece: ICoords, snoko: ICoords[] = snake) => {
        // Wall Collision Detection
        return piece.x * scale >= canvas_size.x ||
            piece.x < 0 ||
            piece.y * scale >= canvas_size.y ||
            piece.y < 0;
    };

    const update = (dt: number) => {
        timer.current += dt;
        if (timer.current > initial_speed) {
            timer.current = 0;
            gameLoop();
        }
    }

    useFrameLoop((dt) => {
        update(dt);
    });

    //useInterval(() => gameLoop(), speed);

    const startGame = () => {
        setIsPlaying(true);
        setSnake(snake_start);
        setApple(apple_start);
        setDirection(direction_start);
        setSpeed(initial_speed);
        setGameOver(false);
        wrapperRef.current?.focus();
        setPoints(0);
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
            x: Math.floor((Math.random() * canvas_size.x - 10) / scale),
            y: Math.floor((Math.random() * canvas_size.y - 10) / scale),
        };
    };

    return (
        <TestContainer>
            <div className="wrapper">
                <div
                    ref={wrapperRef}
                    className="canvas"
                    role="button"
                    tabIndex={0}
                    onKeyDown={(event: React.KeyboardEvent) => moveSnake(event)}
                >
                    <canvas
                        style={
                            gameOver
                                ? { border: '1px solid black', opacity: 0.5 }
                                : { border: '1px solid black' }
                        }
                        ref={canvasRef}
                        width={canvas_size.x}
                        height={canvas_size.y}
                    />
                    {gameOver && <div className="game-over">Game Over</div>}
                    {!isPlaying && (
                        <button className="start" onClick={startGame}>
                            Start Game
                        </button>
                    )}
                </div>
                <p className="points">{points}</p>
            </div>
        </TestContainer>
    );
};

export default Test;
