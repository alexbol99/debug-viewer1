/**
 * Created by alexanderbol on 21/04/2017.
 */

import {Component} from 'react';
// import createjs from 'easel-js';
// import * as createjs from '@createjs/easeljs';
import {graphics} from '../models/graphics';
// import '../../public/styles/App.css';
let createjs = window.createjs;
export class MeasureShapesTool extends Component {
    constructor(params) {
        super();
        this.segment = new createjs.Shape();
        params.stage.addChild(this.segment);

        this.labelShape = new createjs.Text();
        this.labelShape.x = 0;
        this.labelShape.y = 0;
        params.stage.addChild(this.labelShape);

        // var html = document.createElement('div');
        // html.innerText = ""; // params.model.label;
        // html.style.position = "absolute";
        // html.style.top = 0;
        // html.style.left = 0;
        //
        // document.body.appendChild(html);
        // this.labelShape = new createjs.DOMElement(html);
        // params.stage.addChild(this.labelShape);
    }

    // redrawLabel() {
    //     if (!this.labelShape) return;
    //
    //     let stage = this.props.stage;
    //
    //     this.labelShape.htmlElement.style.display = "block";
    //
    //     let box = this.props.shortestSegment.box;
    //     let point = {x: (box.xmin + box.xmax) / 2, y: (box.ymin + box.ymax) / 2};
    //     let dx = 6. / (stage.zoomFactor * stage.resolution);
    //     let dy = 4. / (stage.zoomFactor * stage.resolution);
    //
    //     this.labelShape.htmlElement.style.font = "16px Arial";
    //     this.labelShape.htmlElement.innerText = this.props.shortestSegment.length;
    //
    //     let unscale = 1. / (stage.zoomFactor * stage.resolution);
    //     let tx = stage.canvas.offsetLeft / (stage.zoomFactor * stage.resolution) + point.x + dx;
    //     let ty = -stage.canvas.offsetTop / (stage.zoomFactor * stage.resolution) + point.y + dy;
    //     this.labelShape.setTransform(tx, ty, unscale, -unscale);
    // }

    format(num) {
        return (num/this.props.divisor).toFixed(this.props.decimals);
    }

    redrawLabel() {
        if (!this.labelShape) return;

        let stage = this.props.stage;

        let box = this.props.shortestSegment.box;
        let point = {x: (box.xmin + box.xmax) / 2, y: (box.ymin + box.ymax) / 2};
        let dx = 6. / (stage.zoomFactor * stage.resolution);
        let dy = 4. / (stage.zoomFactor * stage.resolution);

        if (box.ymin === box.ymax) {
            dx = 0;
            dy = -dy;
        }

        // this.labelShape.htmlElement.style.display = "block";
        // this.labelShape.htmlElement.style.font = "16px Arial";
        // this.labelShape.htmlElement.innerText = this.props.shortestSegment.length;

        this.labelShape.text = this.format(this.props.shortestSegment.length);

        let fontSize = 14.; // / (stage.zoomFactor * stage.resolution);
        this.labelShape.font = `${fontSize}px Arial`;

        let unscale = 1. / (stage.zoomFactor * stage.resolution);
        // let tx = stage.canvas.offsetLeft / (stage.zoomFactor * stage.resolution) + point.x + dx;
        // let ty = -stage.canvas.offsetTop / (stage.zoomFactor * stage.resolution) + point.y + dy;
        let tx = point.x + dx;
        let ty = point.y + dy;
        this.labelShape.setTransform(tx, ty, unscale, -unscale);
    }

    draw() {
        if (this.props.shortestSegment) {
            this.segment.graphics = graphics(this.props.shortestSegment);
            this.redrawLabel();
        }
    }
    componentDidMount() {
        this.draw();
    }
    componentDidUpdate() {
        this.segment.graphics.clear();
        if (this.props.firstMeasuredShape && this.props.secondMeasuredShape &&
            this.props.firstMeasuredLayer.displayed &&
            this.props.secondMeasuredLayer.displayed) {

            this.draw();
            this.redrawLabel();
        }
    }

    componentWillUnmount() {
        this.props.stage.removeChild(this.segment);
        this.segment.graphics.clear();
        this.props.stage.removeChild(this.labelShape);
        this.labelShape.text = "";
    }

    render() {
        return null;
    }
}
