module BouncingBalls {

    export interface IBouncingBall extends IPoint, IMoving {
        size: number;
        colour: string
    }
}