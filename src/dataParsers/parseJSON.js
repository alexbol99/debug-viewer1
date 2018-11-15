// import { Job } from '../models/job';
import Flatten from 'flatten-js';

import Model from '../models/model';

export function parseJSON(shapes) {
    let models = [];
    let geom;
    let model;
    for (let shape of JSON.parse(shapes)) {
        if (shape.geom instanceof Array) {      // TODO: add "name" to polygon stringified
            geom = new Flatten.Polygon();
            for (let faceArray of shape.geom) {
                geom.addFace(faceArray);
            }
        }
        else {
            geom = Flatten[shape.geom.name](shape.geom);
        }
        model = new Model(geom, shape.style, shape.label);
        models.push(model);
    }

    return models;
}
