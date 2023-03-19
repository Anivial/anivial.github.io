export interface ICoords {
    x: number;
    y: number;
}

export const Direction = {
    ArrowUp: { x: 0, y: -1 } as ICoords,
    ArrowDown: { x: 0, y: 1 } as ICoords,
    ArrowLeft: { x: -1, y: 0 } as ICoords,
    ArrowRight: { x: 1, y: 0 } as ICoords,
};
