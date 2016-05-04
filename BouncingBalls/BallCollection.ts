/// <reference path="iballcollection.ts" />

module BouncingBalls {
    //choose appropriate name, Rename this class
    export class BallCollection implements IBallCollection {
        public mousePos: Vector;
        public balls: Ball[];

        constructor(points: Ball[]) {
            this.mousePos = new Vector(0, 0);
            this.balls = points;
        }
      
        public update(): void {
            var pointsLength = this.balls.length;

            for (var i = 0; i < pointsLength; i++) {
                var ball = this.balls[i];

                if (ball == null)
                    continue;

                var dx = this.mousePos.x - ball.currentPosition.x;
                var dy = this.mousePos.y - ball.currentPosition.y;
                var dd = (dx * dx) + (dy * dy);
                var d = Math.sqrt(dd);

                if (d < 150) {
                    ball.targetPosition.x = (this.mousePos.x < ball.currentPosition.x) ? ball.currentPosition.x - dx : ball.currentPosition.x - dx;
                    ball.targetPosition.y = (this.mousePos.y < ball.currentPosition.y) ? ball.currentPosition.y - dy : ball.currentPosition.y - dy;
                } else {
                    ball.targetPosition.x = ball.originalPosition.x;
                    ball.targetPosition.y = ball.originalPosition.y;
                };

                ball.update();
            }
        }

        public draw(): void {
            var pointsLength = this.balls.length;
            for (var i = 0; i < pointsLength; i++) {
                var ball = this.balls[i];

                if (ball == null)
                    continue;
                var canvas: HTMLCanvasElement = <HTMLCanvasElement>document.getElementById("c");
                ball.draw(canvas);
            };
        }
    }
}
