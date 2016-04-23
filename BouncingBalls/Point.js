/// <reference path="scripts/typings/jquery/jquery.d.ts" />
/// <reference path="ipointoptions.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var Point = (function () {
        function Point(options) {
            this.friction = 0.8;
            this.colour = options.colour;
            this.currentPosition = new BouncingBalls.Vector(options.x, options.y, options.z);
            this.originalPosition = new BouncingBalls.Vector(options.x, options.y, options.z);
            this.size = options.size;
            this.radius = this.size;
            this.springStrength = 0.1;
            this.targetPosition = new BouncingBalls.Vector(options.x, options.y, options.z);
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
//# sourceMappingURL=Point.js.map