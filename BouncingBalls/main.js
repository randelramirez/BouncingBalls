/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="ipointoptions.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var Ball = (function () {
        function Ball(x, y, z, size, colour) {
            this.friction = 0.8; // move to interface
            this.colour = colour;
            this.currentPosition = new BouncingBalls.Vector(x, y, z);
            this.originalPosition = new BouncingBalls.Vector(x, y, z);
            this.size = size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPosition = new BouncingBalls.Vector(x, y, z);
            this.velocity = new BouncingBalls.Vector(0.0, 0.0, 0.0);
        }
        Ball.prototype.update = function () {
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
        // move to draw to a different interface/class, draw accepts a ball and then draw//
        //ball should not be responsible for drawing itself
        Ball.prototype.draw = function (canvas) {
            var context = canvas.getContext('2d');
            context.fillStyle = this.colour;
            context.beginPath();
            context.arc(this.currentPosition.x, this.currentPosition.y, this.radius, 0, Math.PI * 2, true);
            context.fill();
        };
        return Ball;
    }());
    BouncingBalls.Ball = Ball;
})(BouncingBalls || (BouncingBalls = {}));
/// <reference path="iballcollection.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    //choose appropriate name, Rename this class
    var BallCollection = (function () {
        function BallCollection(points) {
            this.mousePos = new BouncingBalls.Vector(0, 0);
            this.balls = points;
        }
        BallCollection.prototype.update = function () {
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
                }
                else {
                    ball.targetPosition.x = ball.originalPosition.x;
                    ball.targetPosition.y = ball.originalPosition.y;
                }
                ;
                ball.update();
            }
        };
        BallCollection.prototype.draw = function () {
            var pointsLength = this.balls.length;
            for (var i = 0; i < pointsLength; i++) {
                var ball = this.balls[i];
                if (ball == null)
                    continue;
                var canvas = document.getElementById("c");
                ball.draw(canvas);
            }
            ;
        };
        return BallCollection;
    }());
    BouncingBalls.BallCollection = BallCollection;
})(BouncingBalls || (BouncingBalls = {}));
/// <reference path="ball.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var PointCollectionInforRedDecorator = (function () {
        function PointCollectionInforRedDecorator(ballCollection) {
            this.ballCollection = ballCollection;
            this.balls = this.ballCollection.balls;
            this.mousePos = this.ballCollection.mousePos;
            this.changeColor();
        }
        PointCollectionInforRedDecorator.prototype.update = function () {
            this.ballCollection.update();
        };
        PointCollectionInforRedDecorator.prototype.draw = function () {
            this.ballCollection.draw();
        };
        PointCollectionInforRedDecorator.prototype.changeColor = function () {
            var length = this.ballCollection.balls.length;
            for (var i = 0; i < length; i++) {
                var point = this.ballCollection.balls[i];
                point.colour = '#c41731';
            }
            for (var i = 0; i < length; i++) {
                var point = this.ballCollection.balls[i];
            }
        };
        return PointCollectionInforRedDecorator;
    }());
    BouncingBalls.PointCollectionInforRedDecorator = PointCollectionInforRedDecorator;
})(BouncingBalls || (BouncingBalls = {}));
var BouncingBalls;
(function (BouncingBalls) {
    //Changed to VectorPoint
    //Implements, IVector, IPoint
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
/// <reference path="ball.ts" />
/// <reference path="ballcollection.ts" />
/// <reference path="vector.ts" />
/// <reference path="ipointoptions.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var View = (function () {
        function View(canvas, pointCollection) {
            this.canvas = canvas;
            this.ballCollection = pointCollection;
        }
        View.prototype.initEventListeners = function () {
            var _this = this;
            jQuery(window).bind('resize', function () { _this.updateCanvasDimensions(); }).bind('mousemove', function (e) { _this.onMove(e); });
            this.canvas.ontouchmove = function (e) { _this.onTouchMove(e); };
            this.canvas.ontouchstart = function (e) { e.preventDefault(); };
        };
        View.prototype.draw = function () {
            var tmpCanvas = this.canvas;
            var ctx;
            var canvasHeight = this.canvasHeight;
            var canvasWidth = this.canvasWidth;
            if (this.canvas.getContext == null) {
                return;
            }
            ;
            ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            if (this.ballCollection)
                this.ballCollection.draw();
        };
        View.prototype.updateCanvasDimensions = function () {
            var canvas = jQuery("#c");
            canvas.attr({ height: $(window).height(), width: $(window).width() });
            this.canvasWidth = canvas.width();
            this.canvasHeight = canvas.height();
            this.draw();
        };
        View.prototype.onMove = function (e) {
            if (this.ballCollection)
                this.ballCollection.mousePos.set(e.pageX, e.pageY, 0);
        };
        View.prototype.onTouchMove = function (e) {
            if (this.ballCollection)
                this.ballCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY, 0);
        };
        View.prototype.timeout = function () {
            var _this = this;
            this.draw();
            this.update();
            setTimeout(function () { _this.timeout(); }, 30);
        };
        View.prototype.update = function () {
            if (this.ballCollection)
                this.ballCollection.update();
        };
        return View;
    }());
    BouncingBalls.View = View;
})(BouncingBalls || (BouncingBalls = {}));
//# sourceMappingURL=main.js.map