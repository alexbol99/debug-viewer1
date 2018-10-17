/**
 * Created by alexanderbol on 19/06/2017.
 */

import {Component} from 'react';
// import * as createjs from '@createjs/easeljs';
import '../../../../models/graphics';
import Utils from '../../../../models/utils';

let createjs = window.createjs;

export class ImageComponent extends Component {
    constructor(params) {
        super();

        this.bitmap = new createjs.Bitmap(params.model.geom.uri);
        params.stage.addChild(this.bitmap);

        this.labelShape = undefined;

        if (params.model.label && params.model.label.trim() !== "") {
            var html = document.createElement('div');
            html.innerText = params.model.label;
            html.style.position = "absolute";
            html.style.top = 0;
            html.style.left = 0;

            document.body.appendChild(html);

            this.labelShape = new createjs.DOMElement(html);

            this.labelShape.geom = params.model.geom;     // augment label Shape with geom struct
            params.stage.addChild(this.labelShape);
        }
    }

    handleMouseOver = (event) => {
        this.props.onMouseOver(this.props.model);
    };

    handleMouseOut = (event) => {
        this.props.onMouseOut();
    };

    handleClick = (event) => {
        this.props.onClick(this.props.model, this.props.layer);
    };

    redrawLabels(showLabel) {
        if (!this.labelShape) return;

        let stage = this.props.stage;

        this.labelShape.htmlElement.style.display = showLabel ? "block" : "none";

        let box = this.props.model.geom.box;
        let point = {x: (box.xmin + box.xmax) / 2, y: (box.ymin + box.ymax) / 2};
        let dx = 6. / (stage.zoomFactor * stage.resolution);
        let dy = 4. / (stage.zoomFactor * stage.resolution);

        this.labelShape.htmlElement.style.font = "16px Arial";
        let unscale = 1. / (stage.zoomFactor * stage.resolution);
        let tx = stage.canvas.offsetLeft / (stage.zoomFactor * stage.resolution) + point.x + dx;
        let ty = -stage.canvas.offsetTop / (stage.zoomFactor * stage.resolution) + point.y + dy;
        this.labelShape.setTransform(tx, ty, unscale, -unscale);

    }

    redraw() {
        // Draw shape

        let alpha = 0.5; // (this.props.hovered || this.props.selected) ? 1.0 : 0.6;

        this.bitmap.alpha = this.props.displayed ? alpha : 0.0;

        let width = this.props.model.geom.width;

        let ratio = this.bitmap.image.naturalWidth/this.bitmap.image.naturalHeight;
        let scaleX = width/this.bitmap.image.naturalWidth; // 1. / (stage.zoomFactor * stage.resolution);
        let scaleY = width/(this.bitmap.image.naturalHeight*ratio);
        let tx = this.props.model.geom.center.x; // stage.canvas.offsetLeft / (stage.zoomFactor * stage.resolution) + point.x + dx;
        let ty = this.props.model.geom.center.y; // -stage.canvas.offsetTop / (stage.zoomFactor * stage.resolution) + point.y + dy;

        this.bitmap.setTransform(tx, ty, scaleX, -scaleY);

        this.bitmap.regX = this.bitmap.image.naturalWidth/2;
        this.bitmap.regY = this.bitmap.image.naturalHeight/2;

        // let box = this.state.polygon.geom.box;
        // this.shape.cache(box.xmin, box.ymin, box.xmax - box.xmin, box.ymax - box.ymin);

        // Draw labels
        let showLabel = this.props.displayed && this.props.displayLabels;
        this.redrawLabels(showLabel);
    }

    componentDidMount() {
        this.bitmap.on("mouseover", this.handleMouseOver);
        this.bitmap.on("mouseout", this.handleMouseOut);
        this.bitmap.on("click", this.handleClick);

        // this.shape.mouseEnabled = false;

        this.redraw();
    }


    shouldComponentUpdate(nextProps, nextState) {
        if (Utils.is_equal(this.props, nextProps)) {
            return false;
        }
        return true;
    }

    componentDidUpdate() {
        this.redraw();
    }

    componentWillUnmount() {
        this.bitmap.off("mouseover", this.handleMouseOver);
        this.bitmap.off("mouseout", this.handleMouseOut);
        this.bitmap.off("click", this.handleClick);
    }

    render() {
        return null;
    }
}
