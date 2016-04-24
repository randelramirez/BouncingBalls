/// <reference path="point.ts" />

module BouncingBalls {

    export class PointCollectionInforRedDecorator implements IPointCollection {
        pointCollection: IPointCollection;
        points: Point[];
        mousePos: Vector;
        constructor(pointCollection: IPointCollection) {
            this.pointCollection = pointCollection;
            this.points = this.pointCollection.points;
            this.mousePos = this.pointCollection.mousePos;
            this.changeColor();

        }

        public update(): void {
            this.pointCollection.update();
        }

        public draw(): void {
            this.pointCollection.draw();
        }

        private changeColor(): void {
            var length = this.pointCollection.points.length;
            for (var i = 0; i < length; i++) {
                var point = this.pointCollection.points[i];
                point.colour = '#c41731';
            }

            for (var i = 0; i < length; i++) {
                var point = this.pointCollection.points[i];
            }
        }
    }
}