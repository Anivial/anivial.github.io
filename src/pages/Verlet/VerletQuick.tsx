import React, { useEffect, useRef, useState } from 'react';
import { QuickPreview, StyledTooltip, VerletCanvas, VerletPage } from './Vetlet.styled';
import useFrameLoop from 'src/hooks/useFrameLoop';
import useForceUpdate from 'src/hooks/useForceUpdate';
import VerletQuickSolver from './VerletSimulator/VerletSolverQuick';
import { Tooltip } from '@mui/material';

export const CANVAS_SIZE = { x: 1080, y: 1080 };

const VerletQuick = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const game = useRef<VerletQuickSolver>();

    const [fps, setFps] = useState(0);
    const [time, setTime] = useState(0);

    const forceUpdate = useForceUpdate();

    useEffect(() => {
        if (canvasRef.current) {
            game.current = new VerletQuickSolver(forceUpdate, canvasRef.current);
        }
    }, [forceUpdate, canvasRef]);

    useFrameLoop((dt) => {
        setFps(Math.floor(1000 / dt));
        setTime(time + 1000 / 60);
        game.current?.update(1000 / 60);
    });

    useEffect(() => {
        return () => {
            game.current?.dispose();
        };
    }, []);

    const tooltipContent = (): string => {
        if (time < 6000) {
            return 'Hello you ! 👋';
        }
        if (time < 15000) {
            return 'Wow, such smooth ! 🦊';
        }
        if (time < 22000) {
            return 'Wait... 👀';
        }
        return 'It\'s me ! ❤️';
    };

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
            <Tooltip
                open={true}
                title={(
                    <StyledTooltip>
                        {tooltipContent()}
                    </StyledTooltip>
                )}
                arrow
            >
                <QuickPreview
                    src={require('src/assets/quick.jpg')}
                />
            </Tooltip>
        </VerletPage>
    );
};

export default VerletQuick;
