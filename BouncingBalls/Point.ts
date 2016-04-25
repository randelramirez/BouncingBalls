/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="ipointoptions.ts" />


module BouncingBalls {

    //Refactor, change to Ball class
    export class Point {
        public x: number;
        public y: number;
        public z: number;
        public size: number;
        public colour: string
        public currentPosition: Vector;
        public targetPosition: Vector;
        public radius: number;
        private friction: number = 0.8;
        public originalPosition: Vector;
        private springStrength: number;
        public velocity: Vector;

        constructor(x: number, y: number, z: number, size: number, colour: string) {
            this.colour = colour;
            this.currentPosition = new Vector(x, y, z);
            this.originalPosition = new Vector(x, y, z);
            this.size = size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPosition = new Vector(x, y, z);
            this.velocity = new Vector(0.0, 0.0, 0.0);
        }

        public update(): void {
            var dx = this.targetPosition.x - this.currentPosition.x;
            var ax = dx * this.springStrength;
            this.velocity.x += ax;
            this.velocity.x *= this.friction;
            this.currentPosition.x += this.velocity.x;

            var dy = this.targetPosition.y - this.currentPosition.y;
            var ay = dy * this.springStrength;
            this.velocity.y += ay;
            this.velocity.y *= this.friction;
            this.currentPosition.y += this.velocity.y;

            var dox = this.originalPosition.x - this.currentPosition.x;
            var doy = this.originalPosition.y - this.currentPosition.y;
            var dd = (dox * dox) + (doy * doy);
            var d = Math.sqrt(dd);

            this.targetPosition.z = d / 100 + 1;
            var dz = this.targetPosition.z - this.currentPosition.z;
            var az = dz * this.springStrength;
            this.velocity.z += az;
            this.velocity.z *= this.friction;
            this.currentPosition.z += this.velocity.z;

            this.radius = this.size * this.currentPosition.z;
            if (this.radius < 1) this.radius = 1;
        }

        public draw(canvas: HTMLCanvasElement): void {
            var context = <CanvasRenderingContext2D>canvas.getContext('2d');
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
            context.fill();
        }
    }
}



