import { CANVAS_SIZE } from 'src/pages/Verlet/Verlet';

class VerletSolver {
    public canvas: HTMLCanvasElement;
    public context: CanvasRenderingContext2D;

    public forceUpdate: () => void;
    public gameOver: boolean = false;

    public gravity = { x: 0, y: 0.0025 };

    public position = { x: CANVAS_SIZE.x / 2, y: CANVAS_SIZE.y / 2 };
    public radius = 500;

    public time = 0;
    public count = 0;

    public substep = 4;

    public chunks;
    public chunkSize = 60;
    public maxBallCount = 700;
    public balls: Record<string, any> = {
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

    constructor(forceUpdate: () => void, canvas: HTMLCanvasElement) {
        this.forceUpdate = forceUpdate;
        this.canvas = canvas;
        const context = canvas.getContext('2d');
        if (context) {
            this.context = context;
        }

        // Init chunks
        this.chunks = [];
        for (let x = 0; x < CANVAS_SIZE.x / this.chunkSize; x += 1) {
            this.chunks[x] = [];
            for (let y = 0; y < CANVAS_SIZE.y / this.chunkSize; y++) {
                this.chunks[x][y] = [];
            }
        }

        this.balls.color.length = this.maxBallCount;
    }

    public getRainbow = (t: number): string => {
        const r = Math.sin(t);
        const g = Math.sin(t + 0.33 * 2.0 * Math.PI);
        const b = Math.sin(t + 0.66 * 2.0 * Math.PI);

        return `rgb(${255.0 * r * r},${255.0 * g * g},${255.0 * b * b})`;
    };

    public handleCreateBalls = () => {
        const maxAngle = 1.2;
        if (this.time >= 30 * this.count && this.count < this.maxBallCount) {
            const angle = maxAngle * Math.sin(this.time / 1000) + Math.PI * 0.5;
            const speed = 10;
            this.addBall(CANVAS_SIZE.x / 2, 100, speed * Math.cos(angle), speed * Math.sin(angle), this.randomIntFromInterval(5, 25), this.getRainbow(this.time / 1000 / 1.5));
            this.count += 1;
        }
    };

    public update = (dt: number) => {
        this.time += dt;
        this.handleCreateBalls();

        const subDt = dt / this.substep;

        for (let i = 0; i < this.substep; i++) {
            this.updatePositions(subDt);
            this.solveCollisions();
        }

        this.render();
    };

    public randomIntFromInterval(min, max) { // min and max included
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    public dispose() {
    }

    public calcCi = (n, isX): number => { // calculate chunk index
        return Math.min(
            Math.max(Math.floor(n / this.chunkSize), 0),
            Math.floor((isX ? CANVAS_SIZE.x : CANVAS_SIZE.y) / this.chunkSize) - 1
        );
    };

    public isInCorrectChunk = (i): boolean => {
        return (
            this.balls.cx[i] === this.calcCi(this.balls.x[i], true) &&
            this.balls.cy[i] === this.calcCi(this.balls.y[i], false)
        );
    };

    public addToChunk = (i) => {
        this.balls.cx[i] = this.calcCi(this.balls.x[i], true);
        this.balls.cy[i] = this.calcCi(this.balls.y[i], false);
        this.chunks[this.balls.cx[i]][this.balls.cy[i]].push(i);
    };

    public removeFromChunk = (i) => {
        this.chunks[this.balls.cx[i]][this.balls.cy[i]].splice(
            this.chunks[this.balls.cx[i]][this.balls.cy[i]].indexOf(i), 1
        );
    };

    public addBall = (x, y, dx, dy, r = 5, color = 'rgb(255,0,0)') => {
        this.balls.x[this.balls.activeCount] = x;
        this.balls.y[this.balls.activeCount] = y;
        this.balls.px[this.balls.activeCount] = x - dx;
        this.balls.py[this.balls.activeCount] = y - dy;
        this.balls.radius[this.balls.activeCount] = r;
        this.balls.color[this.balls.activeCount] = color;
        this.addToChunk(this.balls.activeCount);
        this.balls.activeCount++;
    };

    public updatePositions = (dt) => {
        for (let i = 0; i < this.balls.activeCount; i++) {
            // Calculate velocity
            let dx = this.balls.x[i] - this.balls.px[i];
            let dy = this.balls.y[i] - this.balls.py[i];

            // Save current position
            this.balls.px[i] = this.balls.x[i];
            this.balls.py[i] = this.balls.y[i];

            // Perform Verlet integration
            this.balls.x[i] += dx + this.gravity.x * dt * dt;
            this.balls.y[i] += dy + this.gravity.y * dt * dt;
        }
    };

    public solveCollisions = () => {
        let cx, cy, chunk, j, n = 0;
        for (let i = 0; i < this.balls.activeCount; i++) {
            this.balls.collisionCount[i] = 0;

            // Update balls in chunks
            if (!this.isInCorrectChunk(i)) {
                this.removeFromChunk(i);
                this.addToChunk(i);
            }

            // Collisions between balls
            for (cx = this.balls.cx[i] - 1; cx <= this.balls.cx[i] + 1; cx++) {
                for (cy = this.balls.cy[i] - 1; cy <= this.balls.cy[i] + 1; cy++) {
                    if (!this.chunks[cx] || !this.chunks[cx][cy]) continue;
                    chunk = this.chunks[cx][cy];
                    for (n = 0; n < chunk.length; n++) {
                        j = chunk[n];
                        if (i === j) continue;

                        let collisionAxisX = this.balls.x[i] - this.balls.x[j];
                        let collisionAxisY = this.balls.y[i] - this.balls.y[j];

                        const dist = Math.sqrt(collisionAxisX * collisionAxisX + collisionAxisY * collisionAxisY);
                        const minDistance = this.balls.radius[i] + this.balls.radius[j];

                        if (dist < minDistance) {
                            let nx = collisionAxisX / dist;
                            let ny = collisionAxisY / dist;

                            const delta = minDistance - dist;

                            this.balls.x[i] += .5 * delta * nx;
                            this.balls.y[i] += .5 * delta * ny;

                            this.balls.x[j] -= .5 * delta * nx;
                            this.balls.y[j] -= .5 * delta * ny;

                            this.balls.collisionCount[i]++;
                            this.balls.collisionCount[j]++;
                        }
                    }
                }
            }

            // Handle circle constraints
            let toObjX = this.balls.x[i] - this.position.x;
            let toObjY = this.balls.y[i] - this.position.y;

            let dist2 = Math.sqrt(toObjX * toObjX + toObjY * toObjY);

            if (dist2 > this.radius - this.balls.radius[i]) {
                let nx = toObjX / dist2;
                let ny = toObjY / dist2;

                this.balls.x[i] = this.position.x + nx * (this.radius - this.balls.radius[i]);
                this.balls.y[i] = this.position.y + ny * (this.radius - this.balls.radius[i]);
            }
        }
    };

    public render() {
        // Clean background
        this.context.clearRect(0, 0, CANVAS_SIZE.x, CANVAS_SIZE.y);

        // Draw constraint
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false);
        this.context.fillStyle = 'black';
        this.context.fill();

        for (let i = 0; i < this.balls.activeCount; i++) {
            this.context.fillStyle = this.balls.color[i];
            this.context.beginPath();
            this.context.arc(this.balls.x[i], this.balls.y[i], this.balls.radius[i], 0, Math.PI * 2, false);
            this.context.fill();
        }
    }
}

export default VerletSolver;
