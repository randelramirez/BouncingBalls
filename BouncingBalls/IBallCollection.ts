module BouncingBalls {

    export interface IBallCollection {
        update(): void;
        draw(): void
        balls: Ball[];
        mousePos: Vector;
    }
}