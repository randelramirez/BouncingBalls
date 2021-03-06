﻿/// <reference path="ball.ts" />
/// <reference path="ballcollection.ts" />
/// <reference path="vector.ts" />
/// <reference path="ipointoptions.ts" />
/// <reference path="scripts/typings/jquery/jquery.d.ts" />

module BouncingBalls {

    export class View {
        private canvas: HTMLCanvasElement;
        public ballCollection: IBallCollection
        private canvasWidth: number;
        private canvasHeight: number;
        constructor(canvas: HTMLCanvasElement, pointCollection: IBallCollection) {
            this.canvas = canvas;
            this.ballCollection = pointCollection;
        }

        public initEventListeners(): void {

            jQuery(window).bind('resize', () => { this.updateCanvasDimensions(); }).bind('mousemove', (e) => { this.onMove(e); });
            this.canvas.ontouchmove = (e: Event) => { this.onTouchMove(e); };
            this.canvas.ontouchstart = (e: Event) => { e.preventDefault(); };
        }

        public draw(): void {

            var tmpCanvas = this.canvas;
            var ctx;
            var canvasHeight = this.canvasHeight;
            var canvasWidth = this.canvasWidth;
            if (this.canvas.getContext == null) {
                return;
            };

            ctx = this.canvas.getContext('2d');
            ctx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);

            if (this.ballCollection)
                this.ballCollection.draw();
        }

        public updateCanvasDimensions(): void {
            var canvas = jQuery("#c");
            canvas.attr({ height: $(window).height(), width: $(window).width() });
            this.canvasWidth = canvas.width();
            this.canvasHeight = canvas.height();
            this.draw();
        }

        public onMove(e): void {
            if (this.ballCollection)
                this.ballCollection.mousePos.set(e.pageX, e.pageY, 0);
        }

        public onTouchMove(e): void {
            if (this.ballCollection)
                this.ballCollection.mousePos.set(e.targetTouches[0].pageX, e.targetTouches[0].pageY, 0);
        }

        public timeout(): void {
            this.draw();
            this.update();
            setTimeout(() => { this.timeout(); }, 30);
        }

        public update(): void {
            if (this.ballCollection)
                this.ballCollection.update();
        }
    }
}
