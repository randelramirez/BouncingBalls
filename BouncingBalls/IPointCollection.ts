module BouncingBalls {

    export interface IPointCollection {
        update(): void;
        draw(): void
        points: Point[];
        mousePos: Vector;
    }
}