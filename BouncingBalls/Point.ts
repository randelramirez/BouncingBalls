/// <reference path="scripts/typings/jquery/jquery.d.ts" />


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
        public curPos: Vector;
        public targetPos: Vector;
        //radius = size;
        public radius: number;
        public friction: number = 0.8;
        public originalPos: Vector;
        public springStrength: number;
        public velocity: Vector;


        constructor(options: IPointOptions) {
            this.colour = options.colour;
            this.curPos = new Vector(options.x, options.y, options.z);
            this.originalPos = new Vector(options.x, options.y, options.z);
            this.size = options.size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPos = new Vector(options.x, options.y, options.z);
            this.velocity = new Vector(0.0, 0.0, 0.0);
            
        }

        public update(): void {
            var dx = this.targetPos.x - this.curPos.x;
            var ax = dx * this.springStrength;
            this.velocity.x += ax;
            this.velocity.x *= this.friction;
            this.curPos.x += this.velocity.x;

            var dy = this.targetPos.y - this.curPos.y;
            var ay = dy * this.springStrength;
            this.velocity.y += ay;
            this.velocity.y *= this.friction;
            this.curPos.y += this.velocity.y;

            var dox = this.originalPos.x - this.curPos.x;
            var doy = this.originalPos.y - this.curPos.y;
            var dd = (dox * dox) + (doy * doy);
            var d = Math.sqrt(dd);

            this.targetPos.z = d / 100 + 1;
            var dz = this.targetPos.z - this.curPos.z;
            var az = dz * this.springStrength;
            this.velocity.z += az;
            this.velocity.z *= this.friction;
            this.curPos.z += this.velocity.z;

            this.radius = this.size * this.curPos.z;
            if (this.radius < 1) this.radius = 1;
        }
    }

    export class Vector {
        public x: number;
        public y: number;
        public z: number;
        constructor(x: number, y: number, z: number/*options: IVectorOptions*/) {
        }

        public addX(x: number): void  {
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


function Point(x, y, z, size, colour) {
    this.colour = colour;
    this.curPos = new Vector(x, y, z);
    this.friction = 0.8;
    this.originalPos = new Vector(x, y, z);
    this.radius = size;
    this.size = size;
    this.springStrength = 0.1;
    this.targetPos = new Vector(x, y, z);
    this.velocity = new Vector(0.0, 0.0, 0.0);

    this.update = function () {
        var dx = this.targetPos.x - this.curPos.x;
        var ax = dx * this.springStrength;
        this.velocity.x += ax;
        this.velocity.x *= this.friction;
        this.curPos.x += this.velocity.x;

        var dy = this.targetPos.y - this.curPos.y;
        var ay = dy * this.springStrength;
        this.velocity.y += ay;
        this.velocity.y *= this.friction;
        this.curPos.y += this.velocity.y;

        var dox = this.originalPos.x - this.curPos.x;
        var doy = this.originalPos.y - this.curPos.y;
        var dd = (dox * dox) + (doy * doy);
        var d = Math.sqrt(dd);

        this.targetPos.z = d / 100 + 1;
        var dz = this.targetPos.z - this.curPos.z;
        var az = dz * this.springStrength;
        this.velocity.z += az;
        this.velocity.z *= this.friction;
        this.curPos.z += this.velocity.z;

        this.radius = this.size * this.curPos.z;
        if (this.radius < 1) this.radius = 1;
    };

    this.draw = function (ctx: CanvasRenderingContext2D) {
        var x = (<HTMLCanvasElement>jQuery("#").get(0)));
        var y = <CanvasRenderingContext2D>x.getContext("");
        
        
        var c = <HTMLCanvasElement>document.getElementById("a");
        document.getElementsByClassName("");
        //var x = <CanvasRenderingContext2D>c;
        //var y = <CanvasRenderingContext2D>(<HTMLCanvasElement>(<HTMLElement>jQuery("")));
        
        
        ctx.fillStyle = this.colour;
        ctx.beginPath();
        ctx.arc(this.curPos.x, this.curPos.y, this.radius, 0, Math.PI * 2, true);
        ctx.fill();
    };
};



function Vector(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;

    this.addX = function (x) {
        this.x += x;
    };

    this.addY = function (y) {
        this.y += y;
    };

    this.addZ = function (z) {
        this.z += z;
    };

    this.set = function (x, y, z) {
        this.x = x;
        this.y = y;
        this.z = z;
    };
};