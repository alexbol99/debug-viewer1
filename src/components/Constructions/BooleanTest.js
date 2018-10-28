import /*React,*/ {Component} from 'react';
import Flatten from 'flatten-js';
import BooleanOp from 'flatten-boolean-op';
import {Layers} from "../../models/layers";
import * as ActionTypes from '../../store/action-types';

let {point, arc, Polygon} = Flatten;
let {subtract, intersect} = BooleanOp;

class BooleanTest extends Component {
    state={
        done:false
    };
    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;
            let layers = this.props.layers;

            let layer = Layers.newLayer(stage, layers);
            layer.color = Layers.getNextColor(layers);
            layer.name = "features";
            layer.title = "features";
            layer.affected = true;
            layer.displayed = true;

            let myPoly = new Polygon();
            myPoly.addFace([point(6, 6), point(6,114), point(114, 114), point(114, 6)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);  // 0

            let myCircle = new Polygon();
            myCircle.addFace([arc(point(0,0),84.5779281026111, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 1

            myPoly = intersect(myPoly,myCircle);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 2

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,0),84.49938828627135, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 3

            myPoly = subtract(myPoly,myCircle);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 4

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,120),84.8710637077582, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 5

            myPoly = intersect(myPoly,myCircle);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 6

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,120),84.79252389141845, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 7

            myPoly = subtract(myPoly,myCircle);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 8

            myCircle = new Polygon();
            myCircle.addFace([arc(point(120,120),85.20624291591454, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 9

            myPoly = intersect(myPoly,myCircle);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 10

            myCircle = new Polygon();
            myCircle.addFace([arc(point(120,120), 85.1277030995748, 0, 2*Math.PI, Flatten.CW)]);
            layers[layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 11

            layers[0].color = Layers.getNextColor(layers);
            layers[0].affected = true;
            layers[0].displayed = true;

            this.props.dispatch({
                type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                stage: stage,
                shape: layers[0]
            });

            this.setState({done:true});
        }
    }
    render() {
        return null;
    }
}

export default BooleanTest;