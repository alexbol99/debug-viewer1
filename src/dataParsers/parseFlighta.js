import { Job } from '../models/job';
import {point, segment, arc, Polygon, Utils, vector} from '@flatten-js/core';

function arcSE(center, start, end, counterClockwise) {
    let startAngle = vector(center, start).slope;
    let endAngle = vector(center, end).slope;
    if (Utils.EQ(startAngle, endAngle)) {
        endAngle += 2 * Math.PI;
        counterClockwise = true;
    }
    let r = vector(center, start).length;

    return arc(center, r, startAngle, endAngle, counterClockwise);
}

function parseComplexShape(row_lines, start, end) {
    let loop = [];
    let loop_start;
    let ps;
    let pe;
    let pc;
    let shape;
    let poly = new Polygon();

    for (let i = start + 1; i < end; i++) {
        let terms = row_lines[i].split(" ");

        if (terms[0] === "A") {
            ps = point(parseInt(terms[5]), parseInt(terms[6]));
            pe = point(parseInt(terms[7]), parseInt(terms[8]));
            pc = point(parseInt(terms[9]), parseInt(terms[10]));
            let counterClockwise = terms[12].includes("1") ? true : false;
            shape = arcSE(pc, ps, pe, counterClockwise);
        } else if (terms[0] === "L") {
            ps = point(parseInt(terms[1]), parseInt(terms[2]));
            pe = point(parseInt(terms[3]), parseInt(terms[4]));
            shape = segment(ps, pe);
        }

        if (loop.length === 0) {
            loop_start = ps;
        }

        loop.push(shape);

        if (pe.equalTo(loop_start)) {
            poly.addFace(loop);
            loop = [];
        }
    }

    return poly;
}

export function parseToFlightaShapes(str) {
    let start = null;
    let end = null;
    let shapes = [];
    let row_lines = str.match(/[^\r\n]+/g);
    for (let i = 0; i < row_lines.length; i++) {
        let line = row_lines[i].split(" ");

        if (line[0] === "S") {
            start = i;
            continue;
        }

        if (line[0] === "E" && start !== null) {
            end = i;
            let poly = parseComplexShape(row_lines, start, end);
            start = null;
            end = null;
            shapes.push(poly)
        }
    }
    return shapes;
}

export function parseFlighta(filename, str) {
    let job = new Job();
    job.filename = filename;
    job.shapes = parseToFlightaShapes(str);
    return job;
}
