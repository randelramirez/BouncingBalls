module BouncingBalls {
    export interface IMoving {
         currentPosition: Vector;
         targetPosition: Vector;
         originalPosition: Vector;
         velocity: Vector;
    }
}