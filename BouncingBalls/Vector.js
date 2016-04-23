var BouncingBall;
(function (BouncingBall) {
    var Vector = (function () {
        function Vector(x, y, z /*options: IVectorOptions*/) {
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
    BouncingBall.Vector = Vector;
})(BouncingBall || (BouncingBall = {}));
//# sourceMappingURL=Vector.js.map