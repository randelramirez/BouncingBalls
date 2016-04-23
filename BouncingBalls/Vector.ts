﻿module BouncingBall {

    export class Vector {
        public x: number;
        public y: number;
        public z: number;
        constructor(x: number, y: number, z: number/*options: IVectorOptions*/) {
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