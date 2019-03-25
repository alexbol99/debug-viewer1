/**
 * Created by alexanderbol on 21/04/2017.
 */
import {Box} from '@flatten-js/core';
import { Stage as CreatejsStage, Touch } from "@createjs/easeljs";

class Stage extends CreatejsStage {
    constructor(canvas) {
        super(canvas);

        Touch.enable(this);
        this.mouseMoveOutside = false;   // true;
        // this.enableDOMEvents(false);
        this.enableMouseOver(20);

        if (this.canvas.clientWidth > 0 && this.canvas.clientHeight > 0) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
            // this.updateViewport(this.canvas.width, this.canvas.height);
        }
        this.origin = {x: this.canvas.width / 2, y: this.canvas.height / 2};
        this.resolution = 0.00001;          // MM 2 Pixels when zoomFactor = 1;
        this.zoomFactor = 1.0;

        this.oldOrigin = {x: undefined, y: undefined};   // used by pan
        // used by zoom by pinch
        this.oldZoomFactor = undefined;
        this.pinchAnchorX = undefined;
        this.pinchAnchorY = undefined;
        this.pinchStarted = false;
    }

    get box() {
        let minX = this.C2W_X(0);
        let minY = this.C2W_Y(this.canvas.height);
        let maxX = this.C2W_X(this.canvas.width);
        let maxY = this.C2W_Y(0);

        return ( new Box(minX, minY, maxX, maxY) );
    }

    clone() {
        let stage = new Stage(this.canvas);
        return Object.assign(stage, this);
    }

    add(shape) {
        this.addChild(shape);
        return this;
    }

    scalingFactor() {
        return this.resolution * this.zoomFactor;
    }

    C2W_Scalar(scalar) {
        return (scalar / this.scalingFactor());
    }

    W2C_Scalar(scalar) {
        return (this.scalingFactor() * scalar);
    }

    C2W_X(canvasX) {
        return ((canvasX - this.origin.x) / this.scalingFactor());
    }

    C2W_Y(canvasY) {
        return ((this.origin.y - canvasY) / this.scalingFactor());
    }

    W2C_X(worldX) {
        return (this.scalingFactor() * worldX + this.origin.x);
    }

    W2C_Y(worldY) {
        return (this.origin.y - this.scalingFactor() * worldY);
    }

    W2C(point) {
        return {x: this.W2C_X(point.x), y: this.W2C_Y(point.y)}
    }

    panTo(newOrigin) {
        this.origin = {x: newOrigin.x, y: newOrigin.y}
    }

    panBy(deltaX, deltaY) {
        this.origin = {
            x: this.origin.x + deltaX,
            y: this.origin.y + deltaY
        }
    }

    // zoom by 10% each time
    zoomIn(ratio) {
        let curRatio = ratio || 1.1;
        this.zoomFactor = Math.min(10000000, curRatio * this.zoomFactor);
    }

    zoomOut(ratio) {
        let curRatio = ratio || 1.1;
        this.zoomFactor = Math.max(0.001, this.zoomFactor / curRatio);
    }

    // ZoomIn/Out + "Focus follows mouse"
    zoom(focusX, focusY, bIn, ratio) {
        let worldX = this.C2W_X(focusX);    // world coordinate of mouse focus before zoom
        let worldY = this.C2W_Y(focusY);

        bIn ? this.zoomIn(ratio) : this.zoomOut(ratio);

        let newFocusX = this.W2C_X(worldX); // canvas coordinate after zoom
        let newFocusY = this.W2C_Y(worldY);

        this.panBy(focusX - newFocusX, focusY - newFocusY);

        return [newFocusX, newFocusY];
    }

    zoomByMouse(focusX, focusY, bIn, ratio) {
        this.zoom(focusX, focusY, bIn, ratio);
    }

    zoomToLimits(width, height) {
        // prevent zero division in case of single point box
        if (width === 0) width = 400000;
        if (height === 0) height = 400000;
        let resolution = Math.min(this.canvas.width / (1.1*width), this.canvas.height / (1.1*height));
        let zoomFactor = resolution / this.resolution;
        let ratio = zoomFactor / this.zoomFactor;
        let bIn = true; //ratio > 1;

        let focusX = this.canvas.width/2;
        let focusY = this.canvas.height/2;
        this.zoom(focusX, focusY, bIn, ratio);
    }

    resize() {
        // this.origin.x = this.canvas.width / 2;
        // this.origin.y = this.canvas.height / 2;
        if (this.canvas.clientWidth > 0 && this.canvas.clientHeight > 0) {
            this.canvas.width = this.canvas.clientWidth;
            this.canvas.height = this.canvas.clientHeight;
        }
    }

    // drawSomething() {
    //     let shape = new Shape();
    //     shape.graphics.beginFill('red').drawRect(0, 0, 20, 20);
    //     this.addChild(shape);
    //     this.update();
    // }

    panByMouseStart() {
        this.oldOrigin.x = this.origin.x;
        this.oldOrigin.y = this.origin.y;
        this.zoomByPinchStop();
    }

    panByMouseMove(dx, dy) {
        if (this.pinchStarted) return;
        if (dx !== undefined && dy !== undefined &&
            this.oldOrigin.x !== undefined && this.oldOrigin.y !== undefined) {
            this.origin = {
                    x: this.oldOrigin.x + dx,
                    y: this.oldOrigin.y + dy
                };
        }
    }

    panByMouseStop() {
        this.oldOrigin.x = undefined;
        this.oldOrigin.y = undefined;
    }

    panToCoordinate(x, y) {
        let canvasX = this.W2C_X(x);
        let canvasY = this.W2C_Y(y);

        let dx = this.canvas.width / 2 - canvasX;
        let dy = this.canvas.height / 2 - canvasY;
        this.panBy(dx, dy);
    }

    zoomByPinchStart(canvasX, canvasY) {
        this.oldZoomFactor = this.zoomFactor;
        this.pinchAnchorX = this.C2W_X(canvasX);
        this.pinchAnchorY = this.C2W_Y(canvasY);
        this.pinchStarted = true;
        this.panByMouseStop();
    }

    zoomByPinchMove(canvasX, canvasY, ratio) {
        this.zoomFactor = ratio * this.oldZoomFactor;
        this.origin = {
            x: canvasX - this.scalingFactor() * this.pinchAnchorX,
            y: canvasY + this.scalingFactor() * this.pinchAnchorY
        }
    }

    zoomByPinchStop() {
        this.oldZoomFactor = undefined;
        this.pinchAnchorX = undefined;
        this.pinchAnchorY = undefined;
        this.pinchStarted = false;
    }

    clear() {
        this.canvas.getContext('2d').clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
}

export default Stage;
