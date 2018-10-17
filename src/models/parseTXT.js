import { Job } from '../models/job';
import {Parser} from '../models/parser';

export function parseTXT(filename, str) {
    let job = new Job();
    job.filename = filename;

    let parser = new Parser();

    let shapesArray = parser.parse(str);

    if (shapesArray.length > 0) {
        for (let shape of shapesArray) {
            job.shapes.push(shape)
        }
    }

    return job
}