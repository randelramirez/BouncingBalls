/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="ipointoptions.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var Point = (function () {
        function Point(x, y, z, size, colour) {
            this.friction = 0.8;
            this.colour = colour;
            this.currentPosition = new BouncingBalls.Vector(x, y, z);
            this.originalPosition = new BouncingBalls.Vector(x, y, z);
            this.size = size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPosition = new BouncingBalls.Vector(x, y, z);
            this.velocity = new BouncingBalls.Vector(0.0, 0.0, 0.0);
        }
        Point.prototype.update = function () {
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
            if (this.radius < 1)
                this.radius = 1;
        };
        Point.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
            context.fill();
        };
        return Point;
    }());
    BouncingBalls.Point = Point;
})(BouncingBalls || (BouncingBalls = {}));
var BouncingBalls;
(function (BouncingBalls) {
    var PointCollection = (function () {
        function PointCollection(points) {
            this.mousePos = new BouncingBalls.Vector(0, 0);
            this.points = points; //= new Array<Point>();
            //this.points = [];
        }
        PointCollection.prototype.newPoint = function (x, y, z) {
            var options = { x: x, y: y, z: z, colour: '', size: 0 };
            var point = new BouncingBalls.Point(x, y, z, 0, '');
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
                var canvas = document.getElementById("c");
                point.draw(canvas);
            }
            ;
        };
        return PointCollection;
    }());
    BouncingBalls.PointCollection = PointCollection;
})(BouncingBalls || (BouncingBalls = {}));
var BouncingBalls;
(function (BouncingBalls) {
    var Vector = (function () {
        function Vector(x, y, z) {
            if (z === void 0) { z = 0; }
            this.x = x;
            this.y = y;
            this.z = z;
        }
        Vector.prototype.addX = function (x) {
            this.x += x;
        };
        Vector.prototype.addY = function (y) {
            this.y += y;
        };
        Vector.prototype.addZ = function (z) {
            this.z += z;
        };
        Vector.prototype.set = function (x, y, z) {
            this.x = x;
            this.y = y;
            this.z = z;
        };
        return Vector;
    }());
    BouncingBalls.Vector = Vector;
})(BouncingBalls || (BouncingBalls = {}));
/// <reference path="point.ts" />
/// <reference path="pointcollection.ts" />
/// <reference path="vector.ts" />
/// <reference path="ipointoptions.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var View = (function () {
        function View(canvas, pointCollection) {
            this.canvas = canvas;
            this.pointCollection = pointCollection;
        }
        View.prototype.initEventListeners = function () {
            //jQuery(window).bind('resize', this.updateCanvasDimensions).bind('mousemove', onMove);
            //jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', this.onMove);
            var _this = this;
            jQuery(window).bind('resize', function () { _this.updateCanvasDimensions(); }).bind('mousemove', function (e) { _this.onMove(e); });
            //var self = this;
            //jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', self.onMove);
            //this.canvas.ontouchmove = function (e) {
            //    e.preventDefault();
            //};
            this.canvas.ontouchmove = function (e) { _this.onTouchMove(e); };
            //this.canvas.ontouchstart = function (e) {
            //    e.preventDefault();
            //};
            this.canvas.ontouchstart = function (e) { e.preventDefault(); };
        };
        View.prototype.draw = function () {
            var tmpCanvas = this.canvas;
            var ctx;
            var canvasHeight;
            var canvasWidth;
            if (tmpCanvas.getContext == null) {
                return;
            }
            ;
            ctx = tmpCanvas.getContext('2d');
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);
            if (this.pointCollection)
                this.pointCollection.draw();
        };
        View.prototype.updateCanvasDimensions = function () {
            var canvas = jQuery("#c");
            canvas.attr({ height: $(window).height(), width: $(window).width() });
            this.canvasWidth = canvas.width();
            this.canvasHeight = canvas.height();
            this.draw();
        };
        View.prototype.onMove = function (e) {
            if (this.pointCollection)
                this.pointCollection.mousePos.set(e.pageX, e.pageY, 0);
        };
        View.prototype.onTouchMove = function (e) {
            if (this.pointCollection)
                this.pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY, 0);
        };
        View.prototype.timeout = function () {
            var _this = this;
            this.draw();
            this.update();
            var self = this;
            setTimeout(function () { _this.timeout(); }, 30);
            //setTimeout(function () { timeout() }, 30);
        };
        View.prototype.update = function () {
            if (this.pointCollection)
                this.pointCollection.update();
        };
        return View;
    }());
    BouncingBalls.View = View;
})(BouncingBalls || (BouncingBalls = {}));
//# sourceMappingURL=main.js.map