/**
 * Created by alexanderbol on 21/04/2017.
 */

import {Component} from 'react';
import {Shape} from '@createjs/easeljs';
import {vector} from '@flatten-js/core';
import {graphics} from '../models/graphics';
import '../../public/styles/App.css';
import CollisionDistance from '@alexbol99/collision_distance';

export class CollisionDistanceDemoTool extends Component {
    constructor(params) {
        super();
        this.shape = new Shape();
        params.stage.addChild(this.shape);
    }

    draw() {
        let polygon1 = this.props.firstMeasuredShape.geom;
        let polygon2 = this.props.secondMeasuredShape.geom;
        let stage = this.props.stage;
        let color = "magenta";
        let alpha = 0.6;
        // let widthOn = this.props.widthOn;

        let strokeStyle = 1;
        let fill = "grey";  // (widthOn && !this.props.displayVertices) ? this.props.color : "white";

        if (this.shape.graphics.isEmpty()) {
            let collision = CollisionDistance.apply(polygon1, polygon2);
            let polygon3 = CollisionDistance.translate(polygon2, vector(-collision,0));
            // let [distance, shortest_segment] = polygon1.distanceTo(polygon3);

            this.shape.graphics = graphics(polygon3,{
                strokeStyle: strokeStyle,
                ignoreScale: true,
                stroke: color,
                fill: fill,
                radius: 3. / (stage.zoomFactor * stage.resolution)
            });
        }
        else {
            if (this.shape.graphics.stroke) this.shape.graphics.stroke.style = color;
            if (this.shape.graphics.fill) this.shape.graphics.fill.style = fill;
        }
        this.shape.alpha = alpha;  // this.props.displayed ? alpha : 0.0;
    }
    clean() {
        if (this.shape) {
            this.shape.graphics.clear();
        }
    }

    componentDidMount() {
        if ( (this.props.firstMeasuredShape && this.props.firstMeasuredLayer.displayed) &&
            (this.props.secondMeasuredShape && this.props.secondMeasuredLayer.displayed) ) {
            this.draw();
        }
    }
    componentDidUpdate() {
        if ( (this.props.firstMeasuredShape && this.props.firstMeasuredLayer.displayed) &&
            (this.props.secondMeasuredShape && this.props.secondMeasuredLayer.displayed) ) {
            this.draw();
        }
        else {
            this.clean();
        }
    }

    componentWillUnmount() {
        if (this.shape) {
            this.props.stage.removeChild(this.shape);
            this.shape.graphics.clear();
        }
    }

    render() {
        return null;
    }
}
