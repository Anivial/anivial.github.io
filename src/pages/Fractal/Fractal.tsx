import React, { useEffect, useRef, useState } from 'react';
import { CanvasContainer, FractalContainer, Settings } from './Fractal.styled';
import { FormControlLabel, FormGroup, Switch, TextField } from '@mui/material';

const RENDER_SIZE = { x: 1920, y: 1080 };
const CONSTANT = { x: -.34, y: .62 };
const ZOOM = 0;
const MAX_ITERATIONS = 200;
const IS_MANDELBROT = false;
const IS_SMOOTH = false;

const Fractal = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isScriptLoaded, setScriptLoaded] = useState<boolean>(false);
    const [isComputing, setIsComputing] = useState<boolean>(false);

    const [renderSize] = useState<{ x: number, y: number }>(RENDER_SIZE);
    const [constant, setConstant] = useState<{ x: number, y: number }>(CONSTANT);
    const [zoom, setZoom] = useState<number>(ZOOM);
    const [maxIteration, setMaxIteration] = useState<number>(MAX_ITERATIONS);
    const [isMandelbrot, setIsMandelBrot] = useState<boolean>(IS_MANDELBROT);
    const [isSmooth, setIsSmooth] = useState<boolean>(IS_SMOOTH);

    useEffect(() => {
        const script = document.createElement('script');
        script.src = '/fractalFunc.js';
        script.type = 'text/javascript';
        script.addEventListener('load', () => setScriptLoaded(true));
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (isScriptLoaded && !isComputing && canvasRef.current) {
            const canvas = canvasRef.current;
            const context = canvas.getContext('2d');

            if (!context) return;

            setIsComputing(true);

            // @ts-ignore
            // From script in index.html
            const gpu = new GPU({ mode: 'gpu' });

            // @ts-ignore
            // Define in /public/fractalFunc
            const computeFractal = gpu.createKernel(fractalFunc, {
                output: [renderSize.x, renderSize.y],
                graphical: true,
            });

            computeFractal(renderSize.x, renderSize.y, Number(constant.x), Number(constant.y), zoom, maxIteration, isMandelbrot, isSmooth);

            context.drawImage(computeFractal.canvas, 0, 0);

            setIsComputing(false);
        }
    }, [canvasRef, isScriptLoaded, renderSize, zoom, constant, maxIteration, isMandelbrot, isSmooth, isComputing]);

    return (
        <FractalContainer>
            <CanvasContainer>
                <canvas
                    ref={canvasRef}
                    width={renderSize.x}
                    height={renderSize.y}
                />
            </CanvasContainer>
            <Settings>
                <TextField
                    type="number"
                    label="x"
                    value={constant.x}
                    onChange={event => setConstant({
                        // @ts-ignore
                        x: event.target.value,
                        y: constant.y,
                    })}
                    fullWidth
                    inputProps={{
                        min: -1,
                        max: 1,
                        step: 0.01,
                    }}
                    size="small"
                />

                <TextField
                    type="number"
                    label="y"
                    value={constant.y}
                    onChange={event => setConstant({
                        x: constant.x,
                        // @ts-ignore
                        y: event.target.value,
                    })}
                    fullWidth
                    inputProps={{
                        min: -1,
                        max: 1,
                        step: 0.01,
                    }}
                    size="small"
                />

                <TextField
                    type="number"
                    label="Zoom"
                    value={zoom}
                    onChange={event => setZoom(Number(event.target.value))}
                    fullWidth
                    inputProps={{
                        min: -10,
                        max: 40,
                        step: 0.2,
                    }}
                    size="small"
                />

                <TextField
                    type="number"
                    label="Iteration"
                    value={maxIteration}
                    onChange={event => setMaxIteration(Number(event.target.value))}
                    fullWidth
                    inputProps={{
                        min: -1,
                        max: 5000,
                        step: 10,
                    }}
                    size="small"
                />

                <FormGroup>
                    <FormControlLabel
                        control={(
                            <Switch
                                value={isMandelbrot ? 'ok' : ''}
                                onChange={() => setIsMandelBrot(!isMandelbrot)}
                            />
                        )}
                        label="Mandelbrot"
                        labelPlacement="start"
                    />

                    <FormControlLabel
                        control={(
                            <Switch
                                value={isSmooth ? 'ok' : ''}
                                onChange={() => setIsSmooth(!isSmooth)}
                            />
                        )}
                        label="Smooth"
                        labelPlacement="start"
                    />
                </FormGroup>
            </Settings>
        </FractalContainer>
    );
};

export default Fractal;
