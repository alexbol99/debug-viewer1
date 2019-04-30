import {Point, Segment, Arc, Circle, Box, Polygon} from "@flatten-js/core";
import {CW, ORIENTATION} from "@flatten-js/core";

import XMLWriter from "xml-writer";

function pointToXMLString(xw, point) {

}

function segmentToXMLString(xw, segment) {

}

function arcToXMLString(xw, arc) {

}

function circleToXMLString(xw, circle) {

}

function boxToXMLString(xw, box) {

}

function polygonToXMlString(xw, polygon) {
    xw.startElement('profile');

    for (let face of polygon.faces) {
        if (face.orientation() === ORIENTATION.CW) {
            xw.startElement('island');
        }
        else {
            xw.start('hole');
        }

        xw.writeAttribute('n_edges', `${face.size}`);

        for (let edge of face) {
            xw.startElement('edge');
            let shape = edge.shape;
            if (shape instanceof Segment) {
                xw.writeAttribute('type', 'segment');
                xw.writeAttribute('xs', shape.ps.x);
                xw.writeAttribute('ys', shape.ps.y);
                xw.writeAttribute('xe', shape.pe.x);
                xw.writeAttribute('ye', shape.pe.y);
            } else if (edge.shape instanceof Arc) {
                xw.writeAttribute('type', 'curve');
                xw.writeAttribute('xs', Math.round(shape.start.x));
                xw.writeAttribute('ys', Math.round(shape.start.y));
                xw.writeAttribute('xe', Math.round(shape.end.x));
                xw.writeAttribute('ye', Math.round(shape.end.y));
                xw.writeAttribute('xc', shape.center.x);
                xw.writeAttribute('yc', shape.center.y);
                xw.writeAttribute('cw', shape.counterClockwise === CW ? "yes" : "no");
            } else {
                xw.writeAttribute('type', 'unknown');
            }
            xw.endElement();
        }

        xw.endElement();  // island or hole
    }

    xw.endElement();     // profile
}

export function createXMLString(shapes) {
    let xw = new XMLWriter(true);
    xw.startDocument('1.0', 'UTF-8');

    xw.startElement('shapes');
    xw.startElement('title').text('test polygon in xml format').endElement();

    for (let shape of shapes) {
        if (shape.geom instanceof Point) {
            pointToXMLString();
        }
        else if (shape.geom instanceof Segment) {
            segmentToXMLString();
        }
        else if (shape.geom instanceof Arc) {
            arcToXMLString();
        }
        else if (shape.geom instanceof Circle) {
            circleToXMLString();
        }
        else if (shape.geom instanceof Box) {
            boxToXMLString()
        }
        else if (shape.geom instanceof Polygon) {
            polygonToXMlString(xw, shape.geom);
        }
    }

    xw.endDocument();
    return xw.toString();
}

