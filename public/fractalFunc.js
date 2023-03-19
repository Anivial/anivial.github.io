const fractalFunc = function (renderX, renderY, constantX, constantY, zoom, maxIteration, mandelbrot, smooth) {
    const scale = 2.0 / renderY / (1.2 ** zoom);

    // @ts-ignore
    const ppx = this.thread.x - renderX / 2.0;
    // @ts-ignore
    const ppy = this.thread.y - renderY / 2.0;

    const px = ppx * scale;
    const py = ppy * scale;

    const z0 = [px, py];
    let constant = [constantX, constantY];

    if (mandelbrot) {
        constant = [px, py];
    }

    let zn = [z0[0], z0[1]];
    let iteration = 0;

    let mod2 = zn[0] * zn[0] + zn[1] * zn[1];

    while (mod2 < 4 && iteration < maxIteration) {
        // Zn²
        const zr = zn[0] * zn[0] - zn[1] * zn[1];
        const zi = 2 * zn[0] * zn[1];

        // Zn+1 = Zn² + C
        zn = [zr + constant[0], zi + constant[1]];
        mod2 = zn[0] * zn[0] + zn[1] * zn[1];
        iteration = iteration + 1;
    }

    if (smooth) {
        const mod = Math.sqrt(mod2);
        const max = Math.max(1, Math.log2(mod));
        iteration = iteration - Math.log2(max);
    }

    // Handle color
    const ratio = iteration / maxIteration;
    this.color(ratio, ratio, ratio);
};
