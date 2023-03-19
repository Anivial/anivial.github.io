import VerletSolver from 'src/pages/Verlet/VerletSimulator/VerletSolver';
import { CANVAS_SIZE } from 'src/pages/Verlet/Verlet';
import { quickColors } from 'src/pages/Verlet/VerletSimulator/points';

class VerletQuickSolver extends VerletSolver {
    constructor(forceUpdate: () => void, canvas: HTMLCanvasElement) {
        super(forceUpdate, canvas);

        this.maxBallCount = 1200;
        this.substep = 4;

        this.balls = {
            activeCount: 0,
            x: new Float32Array(this.maxBallCount),
            y: new Float32Array(this.maxBallCount),
            px: new Float32Array(this.maxBallCount),
            py: new Float32Array(this.maxBallCount),
            cx: new Uint8Array(this.maxBallCount),
            cy: new Uint8Array(this.maxBallCount),
            collisionCount: new Uint8Array(this.maxBallCount),
            radius: new Uint8Array(this.maxBallCount),
            color: [],
        };

        this.balls.color.length = this.maxBallCount;
    }

    // Controlled random
    public mulberry32(a) {
        return function () {
            let t = a += 0x6D2B79F5;
            t = Math.imul(t ^ (t >>> 15), t | 1);
            t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
    }

    public update = (dt: number) => {
        if (this.time < 50000) {
            this.time += dt;
            this.handleCreateBalls();
        }

        const subDt = dt / this.substep;

        for (let i = 0; i < this.substep; i++) {
            this.updatePositions(subDt);
            this.solveCollisions();
        }

        this.render();
    };

    public randomIntFromInterval(min, max) {
        return Math.floor(this.mulberry32(this.time)() * (max - min + 1) + min);
    }

    public handleCreateBalls = () => {
        const maxAngle = 1.4;
        if (this.time >= 10 * this.count && this.count < this.maxBallCount) {
            const angle = maxAngle * Math.sin(this.time / 1000) + Math.PI * 0.5;
            const speed = 13;
            this.addBall(CANVAS_SIZE.x / 2, 100, speed * Math.cos(angle), speed * Math.sin(angle), this.randomIntFromInterval(5, 20), quickColors[this.count]);
            this.count += 1;
        }
    };
}

export default VerletQuickSolver;
