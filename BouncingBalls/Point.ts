﻿/// <reference path="scripts/typings/jquery/jquery.d.ts" />


module BouncingBall {

    export interface IPointOptions {
        colour: string;
        x: number;
        y: number;
        z: number;
        size: number;
    }

    export interface IVectorOptions {
        x: number;
        y: number;
        z: number;
    }

    export class Point {
        public x: number;
        public y: number;
        public z: number;
        public size: number;
        public colour: string
        public currentPosition: Vector;
        public targetPosition: Vector;
        public radius: number;
        public friction: number = 0.8;
        public originalPosition: Vector;
        public springStrength: number;
        public velocity: Vector;
        public canvas: HTMLCanvasElement;

        constructor(options: IPointOptions, canvas: HTMLCanvasElement) {
            this.colour = options.colour;
            this.currentPosition = new Vector(options.x, options.y, options.z);
            this.originalPosition = new Vector(options.x, options.y, options.z);
            this.size = options.size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPosition = new Vector(options.x, options.y, options.z);
            this.velocity = new Vector(0.0, 0.0, 0.0);
            this.canvas = canvas;
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

        public draw(): void {
            var context = <CanvasRenderingContext2D>this.canvas.getContext('2d');
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
            context.fill();
        }
    }
}


