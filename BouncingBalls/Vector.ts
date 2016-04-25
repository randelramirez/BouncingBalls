module BouncingBalls {

    //Changed to VectorPoint
    //Implements, IVector, IPoint
    export class Vector {
        public x: number;
        public y: number;
        public z: number;
        constructor(x: number, y: number, z: number = 0) {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public addX(x: number): void {
            this.x += x;
        }

        public addY(y: number): void {
            this.y += y;
        }

        public addZ(z: number): void {
            this.z += z;
        }

        public set(x: number, y: number, z: number): void {
            this.x = x;
            this.y = y;
            this.z = z;
        }
    }
}