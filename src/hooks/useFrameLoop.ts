import { useEffect, useRef } from 'react';

const useFrameLoop = (update: (dt: number) => void) => {
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

export default useFrameLoop;