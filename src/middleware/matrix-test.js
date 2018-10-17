import Flatten from 'flatten-js';
import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
import { Model } from "../models/model";

let {point, segment, arc, Polygon} = Flatten;

function zoomHome(shape, stage) {
    let box = shape.box;
    let x = (box.xmin + box.xmax)/2;
    let y = (box.ymin + box.ymax)/2;
    stage.panToCoordinate(x, y);
    stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
}

const matrix_test = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED) {
        if (document.location.pathname === '/matrix_test') {

            let stage = action.stage;
            let state = getState();
            let layers = state.layers;

            let layer = Layers.newLayer(stage, layers);
            layer.name = "demo1";
            layer.title = "demo1";

            let s1 = segment(-100, 0, 100, 0);
            let s2 = segment(0, -100, 0, 50);
            // s1.aperture = 10;
            // s2.aperture = 20;

            layer.add( new Model(s1, {}, "segment 1"));
            layer.add( new Model(s2, {}, "segment 2"));

            let a = arc(point(0,0), 50, 0, Math.PI/4, Flatten.CCW);
            layer.add( new Model(a) );

            let polygon = new Polygon();

            layer.add( new Model(point(20,20),{},"ABC123") );
            layer.add( new Model(point(-50,30),{},"Boom boom") );

            polygon.addFace( [
                segment(-500000,-500000, 500000, -500000),
                segment(500000, -500000, 100000, 100000),
                segment(100000,100000, -100000, 100000),
                segment(-100000,100000, -500000, -500000)
            ]);

            // layer.add(new Model(polygon,{},"polygonchik"));

            zoomHome(layer, stage);
            state.layers.push(layer);
        }
    }
    return next(action);
};


export default matrix_test;
