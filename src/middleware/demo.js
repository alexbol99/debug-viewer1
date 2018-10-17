import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
import { Model } from "../models/model";
import axios from "axios";

import { parseODB } from "../models/parserODB";
// let {point, arc, segment, circle, Polygon} = Flatten;

function zoomHome(shape, stage) {
    let box = shape.box;
    let x = (box.xmin + box.xmax)/2;
    let y = (box.ymin + box.ymax)/2;
    stage.panToCoordinate(x, y);
    stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
}

const demo = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED || action.type === ActionTypes.WINDOW_HASH_CHANGED) {
        if (document.location.href.split('#')[1] === 'demo') {
            // console.log(document.location.pathname);
            // console.log(getState());

            let stage = action.stage;
            let state = getState();

            let layers = state.layers;
            let layer = Layers.newLayer(stage, layers);
            layer.color = Layers.getNextColor(layers);
            layer.name = "features";
            layer.title = "features";
            layer.affected = true;
            layer.displayed = true;

            axios("https://gist.githubusercontent.com/alexbol99/825fdf2dd508467cc852eb22aa36183d/raw/d10e853338afd8294eeb3ffdebe3bc380477a978/features")
                .then( (resp) => {
                    let text = resp.data;
                    let job = parseODB("features", text);

                    for (let shape of job.shapes) {
                        let model = new Model(shape, undefined, shape.label);
                        layer.add(model);
                    }

                    zoomHome(layer, stage);
                    state.layers.push(layer);

                    dispatch({
                        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                        stage: stage,
                        shape: layer
                    })
                });
        }
    }
    return next(action);
};


export default demo;
