import { Job } from '../models/job';
import {Point, Segment, Arc, Polygon, vector} from '@flatten-js/core';
import Flatten from '@flatten-js/core';

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

function parseEdges(edgesXML) {
    let edges = [];

    for (let edge of Array.from(edgesXML)) {
        let type = edge.getAttribute('type');

        if (type === "segment") {
            let ps = new Point(parseInt(edge.getAttribute('xs'),10), parseInt(edge.getAttribute('ys'),10));
            let pe = new Point(parseInt(edge.getAttribute('xe'),10), parseInt(edge.getAttribute('ye'),10));

            edges.push(new Segment(ps, pe));
        }

        if (type === "curve") {
            let ps = new Point(parseInt(edge.getAttribute('xs'),10), parseInt(edge.getAttribute('ys'),10));
            let pe = new Point(parseInt(edge.getAttribute('xe'),10), parseInt(edge.getAttribute('ye'),10));
            let pc = new Point(parseInt(edge.getAttribute('xc'),10), parseInt(edge.getAttribute('yc'),10));

            let counterClockwise = edge.getAttribute('cw') === 'no' ? true : false;

            let startAngle = vector(pc,ps).slope;
            let endAngle = vector(pc, pe).slope;

            if (Flatten.Utils.EQ(startAngle, endAngle)) {
                endAngle = counterClockwise ? endAngle + 2*Math.PI : endAngle - 2*Math.PI;
            }

            let r = vector(pc, ps).length;

            edges.push(new Arc(pc, r, startAngle, endAngle, counterClockwise));
        }
    }

    return edges;
}

function parsePolygon(polygonsXML) {
    let polygon = new Polygon();

    // let nedges = parseInt(profile.getAttribute("n_edges"), 10);

    // Augment Flatten object with style
    let color = polygonsXML.getAttribute("color");
    polygon.style = {
        stroke: color || undefined,
        fill: color || undefined,
        alpha: 1.0
    };

    // Augment Flatten object with label
    let label = polygonsXML.getAttribute("label");
    polygon.label = label;

    // Add islands
    let islands = polygonsXML.getElementsByTagName('island');
    for (let island of Array.from(islands)) {
        let edgesXML = island.getElementsByTagName('edge');
        polygon.addFace(parseEdges(edgesXML));
    }

    // Add holes
    let holes = polygonsXML.getElementsByTagName('hole');
    for (let hole of Array.from(holes)) {
        let edgesXML = hole.getElementsByTagName('edge');
        polygon.addFace(parseEdges(edgesXML));
    }

    return polygon;
}

function parseSegment(segmentXML) {
    let ps = new Point(parseInt(segmentXML.getAttribute('xs'),10), parseInt(segmentXML.getAttribute('ys'),10));
    let pe = new Point(parseInt(segmentXML.getAttribute('xe'),10), parseInt(segmentXML.getAttribute('ye'),10));

    let segment = new Segment(ps, pe);

    // Augment Flatten object with label property
    let label = segmentXML.getAttribute("label");
    segment.label = label;

    return segment;
}

function parseCurve(curveXML) {
    let ps = new Point(parseInt(curveXML.getAttribute('xs'),10), parseInt(curveXML.getAttribute('ys'),10));
    let pe = new Point(parseInt(curveXML.getAttribute('xe'),10), parseInt(curveXML.getAttribute('ye'),10));
    let pc = new Point(parseInt(curveXML.getAttribute('xc'),10), parseInt(curveXML.getAttribute('yc'),10));

    let counterClockwise = curveXML.getAttribute('cw') === 'no' ? true : false;

    let startAngle = vector(pc,ps).slope;
    let endAngle = vector(pc, pe).slope;

    if (Flatten.Utils.EQ(startAngle, endAngle)) {
        endAngle = counterClockwise ? endAngle + 2*Math.PI : endAngle - 2*Math.PI;
    }

    let r = vector(pc, ps).length;

    let arc = new Arc(pc, r, startAngle, endAngle, counterClockwise);

    // Augment Flatten object with label property
    let label = curveXML.getAttribute("label");
    arc.label = label;

    return arc;
}

function parsePoint(pointXML) {
    let point = new Point(parseInt(pointXML.getAttribute('x'),10), parseInt(pointXML.getAttribute('y'),10));

    // Augment Flatten object with label property
    let label = pointXML.getAttribute("label");
    point.label = label;

    return point;
}

function parseImage(imageXML) {
    let img = new Flatten.Image();
    img.center = new Point(parseInt(imageXML.getAttribute('xc'),10), parseInt(imageXML.getAttribute('yc'),10));
    img.width = parseInt(imageXML.getAttribute('width'),10);
    img.height = parseInt(imageXML.getAttribute('height'),10);
    img.uri = imageXML.getAttribute('uri');
    return img;
}

export function parseXML(filename, str) {
    let job = new Job();

    job.filename = filename;

    let parser = new DOMParser();
    let xmlDoc = parser.parseFromString(str, "text/xml");

    // Parse document title
    let titles = xmlDoc.getElementsByTagName('title');
    if (titles && titles.length > 0) {
        job.title = titles[0].firstChild.nodeValue;          // take the first title if more than one
    }

    // Parse profiles and add polygons to the job
    let profilesXML = xmlDoc.getElementsByTagName('profile');
    for (let profileXML of Array.from(profilesXML)) {
        let polygon = parsePolygon(profileXML);
        job.profiles.push(polygon);
    }

    // Parse materials and add polygons to the job
    let materialXML = xmlDoc.getElementsByTagName('material');
    for (let shapeXML of Array.from(materialXML)) {
        let polygon = parsePolygon(shapeXML);
        job.materials.push(polygon);
    }

    // Parse segments
    let segmentsXML = xmlDoc.getElementsByTagName('segment');
    for (let segmentXML of Array.from(segmentsXML)) {
        let segment = parseSegment(segmentXML);
        job.shapes.push(segment);
    }

    // Parse segments
    let curvesXML = xmlDoc.getElementsByTagName('curve');
    for (let curveXML of Array.from(curvesXML)) {
        let curve = parseCurve(curveXML);
        job.shapes.push(curve);
    }

    // Parse points
    let pointsXML = xmlDoc.getElementsByTagName('point');
    for (let pointXML of Array.from(pointsXML)) {
        let point = parsePoint(pointXML);
        job.shapes.push(point);
    }

    // Parse images
    let imagesXML = xmlDoc.getElementsByTagName('picture');
    for (let imageXML of Array.from(imagesXML)) {
        let image = parseImage(imageXML);
        job.shapes.push(image);
    }

    return job;
}
