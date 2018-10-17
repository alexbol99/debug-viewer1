import Flatten from 'flatten-js';
import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
import { Model } from "../models/model";
// import * as createjs from '../../public/easeljs-NEXT.combined.js';

let {point, circle, segment, Polygon} = Flatten;

function zoomHome(shape, stage) {
    let box = shape.box;
    let x = (box.xmin + box.xmax)/2;
    let y = (box.ymin + box.ymax)/2;
    stage.panToCoordinate(x, y);
    stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
}

const webgl_test = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED) {
        if (document.location.pathname === '/webgl_test') {

            let stage = action.stage;
            let state = getState();
            let layers = state.layers;

            let layer = Layers.newLayer(stage, layers);
            layer.name = "webgl-demo";
            layer.title = "webgl-demo";

            // let r = 50;
            // let pc = {x:50,y:50}
            // let graphics = new createjs.Graphics();
            // graphics.beginFill("red")
            //     .drawCircle(pc.x,pc.y, r)
            //     .endFill();
            //
            // let shape = new createjs.Shape(graphics);
            //
            // stage.addChild(shape);

            // shape.x = 0;
            // shape.y = 0;

            // shape.cache(pc.x-r,pc.y-r, r*2,r*2);

            // stage.update();
            layer.add( new Model(point(0,0)) );
            layer.add( new Model(point(100,0)) );
            layer.add( new Model(point(0,100)) );
            layer.add( new Model(point(-100,0)) );
            layer.add( new Model(point(0,-100)) );

            layer.add( new Model(circle(point(50,50), 50)) );

            layer.add( new Model(segment(-100, 0, 100, 0), {}, "segment1"));
            layer.add( new Model(segment(0, -100, 0, 50), {}, "segment 2"));

            layer.add( new Model(point(20,20),{},"ABC123") );
            layer.add( new Model(point(-50,30),{},"Boom boom") );

            // let polygon = new Polygon();
            // polygon.addFace( [
            //     segment(-5000,-5000, 5000, -5000),
            //     segment(5000, -5000, 10000, 10000),
            //     segment(10000,10000, -10000, 10000),
            //     segment(-10000,10000, -5000, -5000)
            // ]);
            // layer.add(polygon);

            zoomHome(layer, stage);
            state.layers.push(layer);

        }
    }
    return next(action);
};


export default webgl_test;
