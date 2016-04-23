/// <reference path="point.ts" />
/// <reference path="pointcollection.ts" />
/// <reference path="vector.ts" />
/// <reference path="ipointoptions.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />
var BouncingBalls;
(function (BouncingBalls) {
    var View = (function () {
        function View(canvas) {
            this.canvas = canvas;
        }
        View.prototype.initEventListeners = function () {
            var _this = this;
            //jQuery(window).bind('resize', this.updateCanvasDimensions).bind('mousemove', onMove);
            jQuery(window).bind('resize', function () { _this.updateCanvasDimensions(); }).bind('mousemove', this.onMove);
            //jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', () => { this.onMove(); });
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
            var canvas = jQuery(this.canvas);
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
//# sourceMappingURL=View.js.map