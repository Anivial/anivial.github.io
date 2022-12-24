import React, { useEffect, useRef } from 'react';
import { SnakeCanvas, SnakePage } from './Snake.styled';
import Game from 'src/pages/Snake/Game/Game';
import { Direction } from 'src/pages/Snake/Game/type';
import useFrameLoop from 'src/hooks/useFrameLoop';
import useForceUpdate from 'src/hooks/useForceUpdate';

export const BASE_UNIT = 30;
export const GRID_SIZE = { x: 20, y: 20 };
export const CANVAS_SIZE = { x: GRID_SIZE.x * BASE_UNIT, y: GRID_SIZE.y * BASE_UNIT };
export const SNAKE_START = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const APPLE_START = { x: 8, y: 3 };
export const SCALE = 1;
export const INITIAL_SPEED = 100;
export const DIRECTION_START = Direction.ArrowUp;

const Snake = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const game = useRef<Game>();

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (canvasRef.current) {
            game.current = new Game(forceUpdate, canvasRef.current);
        }
    }, [forceUpdate, canvasRef]);

    useFrameLoop((dt) => {
        game.current?.update(dt);
    });

    useEffect(() => {
        return () => {
            game.current?.dispose();
        }
    }, [])

    const {
        gameOver,
        isPlaying,
        point,
        startGame,
    } = game.current ?? {} as Game;

    return (
        <SnakePage>
            <SnakeCanvas
                ref={canvasRef}
                width={CANVAS_SIZE.x}
                height={CANVAS_SIZE.y}
                gameOver={gameOver}
            />
            {gameOver && <div>Game Over</div>}
            {!isPlaying && (
                <button className="start" onClick={startGame}>
                    Start Game
                </button>
            )}
            <p className="points">{point || 0}</p>
        </SnakePage>
    );
};

export default Snake;
