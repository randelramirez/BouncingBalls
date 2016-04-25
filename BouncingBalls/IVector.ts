module BouncingBalls {
    export interface IVector {
        addX(x: number): void;
        addY(y: number): void;
        addZ(z: number): void;
        set(x: number, y: number, z: number): void
    }
}