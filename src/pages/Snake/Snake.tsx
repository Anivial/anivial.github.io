import React, { useEffect, useRef } from 'react';
import { TestContainer } from './Snake.styled';
import Game from 'src/pages/Snake/Game/Game';
import { Direction } from 'src/pages/Snake/Game/type';

export const BASE_UNIT = 30;
export const GRID_SIZE = { x: 20, y: 20 };
export const CANVAS_SIZE = { x: GRID_SIZE.x * BASE_UNIT, y: GRID_SIZE.y * BASE_UNIT };
export const SNAKE_START = [{ x: 8, y: 7 }, { x: 8, y: 8 }];
export const APPLE_START = { x: 8, y: 3 };
export const SCALE = 1;
export const INITIAL_SPEED = 100;
export const DIRECTION_START = Direction.ArrowUp;

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

export const useForceUpdate = (): () => void => {
    const [, updateState] = React.useState<any>();
    return React.useCallback(() => updateState({}), []);
};

const Snake = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const game = useRef<Game | null>(null);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (canvasRef.current) {
            Game.canvas = canvasRef.current;
            const context = canvasRef.current.getContext('2d');
            if (context) {
                Game.context = context;
            }
            game.current = new Game(forceUpdate);
        }
    }, [forceUpdate, canvasRef]);

    useFrameLoop((dt) => {
        game.current?.update(dt);
    });

    return (
        <TestContainer>
            <canvas
                style={
                    game.current?.gameOver
                        ? { border: '1px solid black', opacity: 0.5 }
                        : { border: '1px solid black' }
                }
                ref={canvasRef}
                width={CANVAS_SIZE.x}
                height={CANVAS_SIZE.y}
            />
            {game.current?.gameOver && <div className="game-over">Game Over</div>}
            {!game.current?.isPlaying && (
                <button className="start" onClick={() => game.current?.startGame()}>
                    Start Game
                </button>
            )}
            <p className="points">{game.current?.point || 0}</p>
        </TestContainer>
    );
};

export default Snake;
