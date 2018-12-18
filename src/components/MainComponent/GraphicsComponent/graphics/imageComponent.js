/**
 * Created by alexanderbol on 19/06/2017.
 */

import {Component} from 'react';
// import * as createjs from '@createjs/easeljs';
import '../../../../models/graphics';
import Utils from '../../../../models/utils';
import storage from '../../../../firebase-storage';

let createjs = window.createjs;

export class ImageComponent extends Component {
    handleMouseOver = (event) => {
        this.props.onMouseOver(this.props.model);
    };

    handleMouseOut = (event) => {
        this.props.onMouseOut();
    };

    handleClick = (event) => {
        this.props.onClick(this.props.model, this.props.layer);
    };

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
    }

    componentDidMount() {
        const img = new Image();

        img.onload = () => {
            this.bitmap = new createjs.Bitmap(img);
            this.props.stage.addChild(this.bitmap);

            // this.bitmap.on("mouseover", this.handleMouseOver);
            // this.bitmap.on("mouseout", this.handleMouseOut);
            // this.bitmap.on("click", this.handleClick);

            // this.shape.mouseEnabled = false;
            this.redraw();
        };

        // Create a reference from a Google Cloud Storage URI
        const ref = storage.refFromURL(this.props.model.geom.uri);

        ref.getDownloadURL()
            .then( url => img.src = url)
            .catch( error => console.log(error))
        // img.src = this.props.model.geom.uri;
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
        // this.bitmap.off("mouseover", this.handleMouseOver);
        // this.bitmap.off("mouseout", this.handleMouseOut);
        // this.bitmap.off("click", this.handleClick);

        this.props.stage.removeChild(this.bitmap);
    }

    render() {
        return null;
    }
}
