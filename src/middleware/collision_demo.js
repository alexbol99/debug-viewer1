
import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
// import { Model } from "../models/model";
// import file1 from '../../public/Block_53388_2parts_Cont.txt';
// import {parseODB} from "../models/parserODB";

import Flatten from 'flatten-js';

let {Segment, Arc, Vector, Polygon} = Flatten;

let filename = "Block_53388_2parts_Cont.txt";
// let filename = "polygon.txt";

function zoomHome(shape, stage) {
    let box = shape.box;
    let x = (box.xmin + box.xmax)/2;
    let y = (box.ymin + box.ymax)/2;
    stage.panToCoordinate(x, y);
    stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);
}

function translate(polygon, vec) {
    let newPolygon = new Polygon();
    for (let face of polygon.faces) {
        let shapes = [];
        for (let edge of face) {
            if (edge.shape instanceof Segment) {
                shapes.push(
                    new Segment(edge.shape.ps.translate(vec), edge.shape.pe.translate(vec))
                )
            }
            else if (edge.shape instanceof  Arc) {
                let arc_trans = edge.shape.clone();
                arc_trans.pc = edge.shape.pc.translate(vec);
                shapes.push(arc_trans);
            }
        }
        newPolygon.addFace(shapes);
    }
    return newPolygon;
}

const collision_demo = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED || action.type === ActionTypes.WINDOW_HASH_CHANGED) {
        if (document.location.href.split('#')[1] === 'collision_demo') {
            // let str = file1;
            // let text = atob(str.split(',')[1]);

            let stage = action.stage;
            let state = getState();

            let xhr = new XMLHttpRequest();
            let url = process.env.PUBLIC_URL + '/' + filename;
            // let url = "./public/" + filename;
            xhr.open('GET',url,true);
            xhr.onreadystatechange = function(event) {
                if (this.readyState === 4 && this.status === 200) {
                    let text = this.responseText;

                    let layers = state.layers;
                    let layer = Layers.newLayer(stage, layers);
                    layer.name = "collision_demo";
                    layer.title = "collision_demo";

                    let parser = state.app.parser;
                    let polygon = parser.parseToPolygon(text);
                    layer.add(polygon);

                    let vec = new Vector( 2*(polygon.box.xmax - polygon.box.xmin), 0 );
                    // let vec = new Vector(500000, 0);
                    let trPolygon = translate(polygon, vec);
                    layer.add(trPolygon);

                    zoomHome(layer, stage);
                    state.layers.push(layer);

                    dispatch({
                        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                        stage: stage,
                        shape: layer
                    });

                    dispatch({
                        type: ActionTypes.COLLISION_DEMO_URI
                    })
                }
            };
            xhr.send();
        }
    }
    return next(action);
};


export default collision_demo;
