/// <reference path="ball.ts" />

module BouncingBalls {

    export class PointCollectionInforRedDecorator implements IBallCollection {
        ballCollection: IBallCollection;
        balls: Ball[];
        mousePos: Vector;
        constructor(ballCollection: IBallCollection) {
            this.ballCollection = ballCollection;
            this.balls = this.ballCollection.balls;
            this.mousePos = this.ballCollection.mousePos;
            this.changeColor();

        }

        public update(): void {
            this.ballCollection.update();
        }

        public draw(): void {
            this.ballCollection.draw();
        }

        private changeColor(): void {
            var length = this.ballCollection.balls.length;
            for (var i = 0; i < length; i++) {
                var point = this.ballCollection.balls[i];
                point.colour = '#c41731';
            }

            for (var i = 0; i < length; i++) {
                var point = this.ballCollection.balls[i];
            }
        }
    }
}