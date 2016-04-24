module BouncingBalls {
    export class PointCollection {
        public mousePos: Vector;
        public points: Point[];

        constructor(points: Point[]) {
            this.mousePos = new Vector(0, 0);
            this.points = points;
        }

        public newPoint(x: number, y: number, z: number): Point {
            var options: IPointOptions = { x: x, y: y, z: z, colour: '', size: 0 };
            var point = new Point(x, y, z, 0,'');
            this.points.push(point);
            return point;
        }

        public update(): void {
            var pointsLength = this.points.length;

            for (var i = 0; i < pointsLength; i++) {
                var point = this.points[i];

                if (point == null)
                    continue;

                var dx = this.mousePos.x - point.currentPosition.x;
                var dy = this.mousePos.y - point.currentPosition.y;
                var dd = (dx * dx) + (dy * dy);
                var d = Math.sqrt(dd);

                if (d < 150) {
                    point.targetPosition.x = (this.mousePos.x < point.currentPosition.x) ? point.currentPosition.x - dx : point.currentPosition.x - dx;
                    point.targetPosition.y = (this.mousePos.y < point.currentPosition.y) ? point.currentPosition.y - dy : point.currentPosition.y - dy;
                } else {
                    point.targetPosition.x = point.originalPosition.x;
                    point.targetPosition.y = point.originalPosition.y;
                };

                point.update();
            }
        }

        public draw(): void {
            var pointsLength = this.points.length;
            for (var i = 0; i < pointsLength; i++) {
                var point = this.points[i];

                if (point == null)
                    continue;
                var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c");
                point.draw(canvas);
            };
        }
    }
}
