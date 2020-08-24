// import { Job } from '../models/job';
import Flatten from '@flatten-js/core';

// import Model from '../models/model';
import {Job} from "../models/job";

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

// export function parseJSON(shapes) {
//     let models = [];
//     let geom;
//     let model;
//     for (let shape of JSON.parse(shapes)) {
//         if (shape.geom instanceof Array) {      // TODO: add "name" to polygon stringified
//             geom = new Flatten.Polygon();
//             for (let faceArray of shape.geom) {
//                 geom.addFace(faceArray);
//             }
//         }
//         else if (shape.geom.uri) {
//             geom = new Flatten.Image();
//             geom.uri = shape.geom.uri;
//             geom.center = shape.geom.center;
//             geom.width = shape.geom.width;
//             geom.height = shape.geom.height;
//         }
//         else {
//             geom = Flatten[shape.geom.name](shape.geom);
//         }
//         model = new Model(geom, shape.style, shape.label);
//         models.push(model);
//     }
//
//     return models;
// }

function parseJSONShape(jsonShape) {
    if (jsonShape.name === "segment") {
        return new Flatten.Segment(jsonShape);
    }

    if (jsonShape.name === "arc") {
        return new Flatten.Arc(jsonShape);
    }

    if (jsonShape.name === "point") {
        return new Flatten.Point(jsonShape);
    }
}

export function parseJSON(filename="", str) {
    let job = new Job();

    job.filename = filename;

    let jsonArray;

    try {
        jsonArray = JSON.parse(str);
    } catch (e) {
        throw new Error("Illegal JSON string")
    }

    if (jsonArray instanceof Array) {
        try {
            let polygon = new Flatten.Polygon();
            for (let faceArray of jsonArray) {
                polygon.addFace(faceArray);
            }
            job.shapes.push(polygon);
        }
        catch (e) {
            for (let jsonShape of jsonArray) {
                job.shapes.push( parseJSONShape(jsonShape) );
            }
        }
    }
    else {
        job.shapes.push( parseJSONShape(jsonArray) );
    }

    return job;
}
