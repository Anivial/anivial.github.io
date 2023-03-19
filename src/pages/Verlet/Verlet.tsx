import React, { useEffect, useRef, useState } from 'react';
import { VerletCanvas, VerletPage } from './Vetlet.styled';
import useFrameLoop from 'src/hooks/useFrameLoop';
import useForceUpdate from 'src/hooks/useForceUpdate';
import VerletSolver from './VerletSimulator/VerletSolver';

export const CANVAS_SIZE = { x: 1080, y: 1080 };

const Verlet = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const game = useRef<VerletSolver>();

    const [fps, setFps] = useState(0);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (canvasRef.current) {
            game.current = new VerletSolver(forceUpdate, canvasRef.current);
        }
    }, [forceUpdate, canvasRef]);

    useFrameLoop((dt) => {
        setFps(Math.floor(1000 / dt));
        game.current?.update(Math.min(dt, 1000 / 70));
    });

    useEffect(() => {
        return () => {
            game.current?.dispose();
        };
    }, []);

    return (
        <VerletPage>
            <VerletCanvas
                ref={canvasRef}
                width={CANVAS_SIZE.x}
                height={CANVAS_SIZE.y}
            />
            <div>
                {fps} fps
            </div>
        </VerletPage>
    );
};

export default Verlet;
