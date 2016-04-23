var BouncingBalls;
(function (BouncingBalls) {
    var Vector = (function () {
        function Vector(x, y, z) {
            if (z === void 0) { z = 0; }
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
//# sourceMappingURL=Vector.js.map