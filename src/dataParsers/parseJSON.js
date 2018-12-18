// import { Job } from '../models/job';
import Flatten from 'flatten-js';

import Model from '../models/model';

Flatten.Image = class Image {
    constructor() {
        this.uri = "";
        /**
         * Center in world coordinates
         * @type {Flatten.Point}
         */
        this.center = new Flatten.Point();
        /**
         * Width in world units (inch/mm)
         */
        this.width = 0;
        /**
         * Height in world units (inch/mm)
         */
        this.height = 0;
    }
    get box() {
        return new Flatten.Box(
            this.center.x - this.width/2,
            this.center.y - this.height/2,
            this.center.x + this.height/2,
            this.center.y + this.height/2
        );

    }
};

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
        else if (shape.geom.uri) {
            geom = new Flatten.Image();
            geom.uri = shape.geom.uri;
            geom.center = shape.geom.center;
            geom.width = shape.geom.width;
            geom.height = shape.geom.height;
        }
        else {
            geom = Flatten[shape.geom.name](shape.geom);
        }
        model = new Model(geom, shape.style, shape.label);
        models.push(model);
    }

    return models;
}
