/**
 * Created by alexanderbol on 21/04/2017.
 */

import {Component} from 'react';
// import * as createjs from '@createjs/easeljs';
import {graphics} from '../models/graphics';
// import '../../public/styles/App.css';
let createjs = window.createjs;
export class AabbDemoTool extends Component {
    constructor(params) {
        super();
        this.boxShapes = [];
        this.edgeShapes = [];
    }

    draw() {
        for (let shape of this.boxShapes) {
            this.props.stage.removeChild(shape);
        }
        this.boxShapes = [];
        this.drawTreeLevel(this.props.firstMeasuredShapeLevel);
        this.drawTreeLevel(this.props.secondMeasuredShapeLevel);

        for (let shape of this.edgeShapes) {
            this.props.stage.removeChild(shape);
        }
        this.edgeShapes = [];
        this.drawSelectedEdges();
    }

    drawTreeLevel(level) {
        if (level.length === 0) return;
        let stage = this.props.stage;
        for (let node of level) {
            let nodeGraphics;
            if (node.max) {
                nodeGraphics = graphics(node.max);
            }
            if (nodeGraphics) {
                let shape = new createjs.Shape(nodeGraphics);
                stage.addChild(shape);
                this.boxShapes.push(shape);

                let edge = new createjs.Shape(graphics(node.item.key,{
                    strokeStyle: 3,
                    stroke: "blue"
                }));
                stage.addChild(edge);
                this.boxShapes.push(edge);
            }
        }
    }

    drawSelectedEdges() {
        let stage = this.props.stage;
        let _this = this;
        if (!this.props.selectedEdgesTree) return;
        this.props.selectedEdgesTree.forEach((interval, shape) => {
            if (interval.low < _this.props.minStop) {
                let edge = new createjs.Shape(graphics(shape,{
                    strokeStyle: 3,
                    stroke: "blue"
                }));
                stage.addChild(edge);
                _this.edgeShapes.push(edge);
            }
        });
    }

    componentDidMount() {
        this.draw();
    }
    componentDidUpdate() {
        if ( (this.props.firstMeasuredShape && this.props.firstMeasuredLayer.displayed) ||
            (this.props.secondMeasuredShape && this.props.secondMeasuredLayer.displayed) ) {

            this.draw();
        }
    }

    componentWillUnmount() {
        for (let shape of this.boxShapes) {
            this.props.stage.removeChild(shape);
        }
        this.boxShapes = [];
        for (let shape of this.edgeShapes) {
            this.props.stage.removeChild(shape);
        }
        this.edgeShapes = [];
    }

    render() {
        return null
    }
}
