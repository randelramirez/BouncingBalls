var BouncingBalls;
(function (BouncingBalls) {
    var PointCollection = (function () {
        function PointCollection() {
            this.mousePos = new BouncingBalls.Vector(0, 0);
            this.points = new Array();
            //this.points = [];
        }
        PointCollection.prototype.newPoint = function (x, y, z) {
            var options = { x: x, y: y, z: z, colour: '', size: 0 };
            var point = new BouncingBalls.Point(options);
            this.points.push(point);
            return point;
        };
        PointCollection.prototype.update = function () {
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
                }
                else {
                    point.targetPosition.x = point.originalPosition.x;
                    point.targetPosition.y = point.originalPosition.y;
                }
                ;
                point.update();
            }
        };
        PointCollection.prototype.draw = function () {
            var pointsLength = this.points.length;
            for (var i = 0; i < pointsLength; i++) {
                var point = this.points[i];
                if (point == null)
                    continue;
                var canvas = document.getElementById("canvas");
                point.draw(canvas);
            }
            ;
        };
        return PointCollection;
    }());
    BouncingBalls.PointCollection = PointCollection;
})(BouncingBalls || (BouncingBalls = {}));
//# sourceMappingURL=PointCollection.js.map