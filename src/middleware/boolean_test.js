import Flatten from 'flatten-js';
import BooleanOp from 'flatten-boolean-op';
import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
// import { Model } from "../models/model";
// import * as createjs from '../../public/easeljs-NEXT.combined.js';

let {point, arc, Polygon} = Flatten;
let {subtract, intersect} = BooleanOp;

function zoomHome(shape, stage) {
    let box = shape.box;
    let x = (box.xmin + box.xmax)/2;
    let y = (box.ymin + box.ymax)/2;
    stage.panToCoordinate(x, y);
    stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
}

const boolean_test = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED) {
        if (document.location.href.split('#')[1] === 'boolean_test') {

            let stage = action.stage;
            let state = getState();
            let layers = state.layers;

            let myPoly = new Polygon();
            myPoly.addFace([point(6, 6), point(6,114), point(114, 114), point(114, 6)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);  // 0

            let myCircle = new Polygon();
            myCircle.addFace([arc(point(0,0),84.5779281026111, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 1

            myPoly = intersect(myPoly,myCircle);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 2

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,0),84.49938828627135, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 3

            myPoly = subtract(myPoly,myCircle);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 4

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,120),84.8710637077582, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 5

            myPoly = intersect(myPoly,myCircle);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 6

            myCircle = new Polygon();
            myCircle.addFace([arc(point(0,120),84.79252389141845, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 7

            myPoly = subtract(myPoly,myCircle);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 8

            myCircle = new Polygon();
            myCircle.addFace([arc(point(120,120),85.20624291591454, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 9

            myPoly = intersect(myPoly,myCircle);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 10

            myCircle = new Polygon();
            myCircle.addFace([arc(point(120,120), 85.1277030995748, 0, 2*Math.PI, Flatten.CW)]);
            state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myCircle);  // 11

            // myPoly = subtract(myPoly,myCircle);
            // state.layers[state.layers.length] = Layers.newLayer(stage, layers).add(myPoly);   // 12
        }
    }
    return next(action);
};

export default boolean_test;
