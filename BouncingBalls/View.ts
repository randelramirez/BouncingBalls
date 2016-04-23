/// <reference path="point.ts" />
/// <reference path="pointcollection.ts" />
/// <reference path="vector.ts" />
/// <reference path="ipointoptions.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />

module BouncingBalls {

    export class View {
        private canvas: HTMLCanvasElement;
        private pointCollection: PointCollection
        private canvasWidth: number;
        private canvasHeight: number;
        constructor(canvas: HTMLCanvasElement) {
            this.canvas = canvas;
        }

        public initEventListeners(): void {
            //jQuery(window).bind('resize', this.updateCanvasDimensions).bind('mousemove', onMove);
            jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', this.onMove);



            //jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', () => { this.onMove(); });
            //var self = this;
            //jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', self.onMove);

            //this.canvas.ontouchmove = function (e) {
            //    e.preventDefault();
            //};

            this.canvas.ontouchmove = (e: Event) => { this.onTouchMove(e); };

            //this.canvas.ontouchstart = function (e) {
            //    e.preventDefault();
            //};

            this.canvas.ontouchstart = (e: Event) => { e.preventDefault(); };
        }

        public draw(): void {

            var tmpCanvas = this.canvas;
            var ctx;
            var canvasHeight;
            var canvasWidth;
            if (tmpCanvas.getContext == null) {
                return;
            };

            ctx = tmpCanvas.getContext('2d');
            ctx.clearRect(0, 0, canvasWidth, canvasHeight);

            if (this.pointCollection)
                this.pointCollection.draw();
        }

        public updateCanvasDimensions(): void {
            var canvas = jQuery(this.canvas);
            canvas.attr({ height: $(window).height(), width: $(window).width() });
            this.canvasWidth = canvas.width();
            this.canvasHeight = canvas.height();
            this.draw();
        }

        public onMove(e): void {
            if (this.pointCollection)
                this.pointCollection.mousePos.set(e.pageX, e.pageY, 0);
        }

        public onTouchMove(e): void {
            if (this.pointCollection)
                this.pointCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY, 0);
        }

        public timeout(): void {
            this.draw();
            this.update();
            var self = this;
            setTimeout(() => { this.timeout(); }, 30);
            //setTimeout(function () { timeout() }, 30);
        }

        public update(): void {
            if (this.pointCollection)
                this.pointCollection.update();
        }
    }
}
