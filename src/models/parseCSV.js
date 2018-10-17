import { Job } from '../models/job';
import Flatten from 'flatten-js';

let {point} = Flatten;

const micron2pixels = 400;
function micronToPixels(str) {
    return Math.round(Number(str)*micron2pixels,0);
}

export function parseCSV(filename, str) {
    let job = new Job();
    job.filename = filename;

    let arrayOfLines = str.match(/[^\r\n]+/g);

    for (let i = 0; i < arrayOfLines.length; i++) {
        let line = arrayOfLines[i];
        let terms = line.split(',');

        let px = micronToPixels(terms[0]);
        let py = micronToPixels(terms[1]);
        let nx = Number(terms[2]);
        let ny = Number(terms[3]);
        let shape = point(px,py);
        shape.nx = nx
        shape.ny = ny;
        job.shapes.push(shape)
    }

    return job
}