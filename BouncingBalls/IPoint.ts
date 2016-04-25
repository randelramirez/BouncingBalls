module BouncingBalls {

    //refactor, remove size and colour to IBall
    export interface IPoint {
          x: number;
          y: number;
          z: number;
          size: number;
          colour: string
    }
}