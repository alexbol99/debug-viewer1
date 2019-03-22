import {Point, Segment, Circle, Arc, Polygon, Box} from '@flatten-js/core';

// import * as createjs from '@createjs/easeljs';
let createjs = window.createjs;
// let {Point, Segment, Circle, Arc, Polygon, Box} = Flatten;

/* Provide conversion methods from FlattenJS objects to CreateJS Graphics */
export function graphics(shape, style = undefined) {
    if (shape instanceof Point) {
        return graphics_point(shape, style);
    }
    if (shape instanceof Segment) {
        return graphics_segment(shape, style);
    }
    if (shape instanceof Arc) {
        return graphics_arc(shape, style);
    }
    if (shape instanceof Circle) {
        return graphics_circle(shape, style);
    }
    if (shape instanceof Box) {
        return graphics_box(shape, style);
    }
    if (shape instanceof Polygon) {
        return graphics_polygon(shape, style);
    }
    return null;
}

// Point.prototype.graphics = function(style) {
function graphics_point(point, style) {
    let radius = (style && style.radius) ? style.radius : 3;
    let fill = style && style.fill ? style.fill : "#FF0303";
    let graphics = new createjs.Graphics();
    graphics.fill = graphics.beginFill(fill).command;
    graphics.circle = graphics.drawCircle(point.x, point.y, radius).command;
    return graphics;
};

// Segment.prototype.graphics = function(style) {
function graphics_segment(segment, style) {
    let graphics = new createjs.Graphics();
    let strokeStyle = style && style.strokeStyle !== undefined ? style.strokeStyle : 2;
    let ignoreScale = style && style.ignoreScale !== undefined ? style.ignoreScale : true;
    let stroke = style && style.stroke ? style.stroke : "black";
    return graphics
        .setStrokeStyle(strokeStyle,1,0,10,ignoreScale)
        .beginStroke(stroke)
        .moveTo(segment.ps.x, segment.ps.y)
        .lineTo(segment.pe.x, segment.pe.y)
        .endStroke();
};

// Arc.prototype.graphics = function(style) {
function graphics_arc(arc, style) {
    // let startAngle = 2 * Math.PI - this.startAngle;
    // let endAngle =  2 * Math.PI - this.endAngle;
    let graphics = new createjs.Graphics();
    let strokeStyle = style && style.strokeStyle ? style.strokeStyle : 2;
    let ignoreScale = style && style.ignoreScale !== undefined ? style.ignoreScale : true;
    let stroke = style && style.stroke ? style.stroke : "black";
    return graphics
        .setStrokeStyle(strokeStyle,1,0,10,ignoreScale)
        .beginStroke(stroke)
        .arc(arc.pc.x, arc.pc.y, arc.r, arc.startAngle, arc.endAngle, !arc.counterClockwise)
        .endStroke();
};

// Circle.prototype.graphics = function(style) {
function graphics_circle(circle, style) {
    let graphics = new createjs.Graphics();
    let strokeStyle = style && style.strokeStyle ? style.strokeStyle : 2;
    let stroke = style && style.stroke ? style.stroke : "black";
    // graphics.setStrokeStyle(2).beginStroke("black").beginFill("red").drawCircle(pcx, pcy, r);
    return graphics
        .setStrokeStyle(strokeStyle,0,0,10,true)
        .beginStroke(stroke)
        .drawCircle(circle.pc.x, circle.pc.y, circle.r)
        .endStroke();
};

// Box.prototype.graphics = function(style) {
function graphics_box(box, style) {
    let graphics = new createjs.Graphics();
    let strokeStyle = style && style.strokeStyle ? style.strokeStyle : 1;
    let stroke = style && style.stroke ? style.stroke : "black";
    // graphics.setStrokeStyle(2).beginStroke("black").beginFill("red").drawCircle(pcx, pcy, r);
    return graphics
        .setStrokeStyle(strokeStyle,0,0,10,true)
        .beginStroke(stroke)
        .drawRect(box.xmin, box.ymin, box.xmax-box.xmin, box.ymax-box.ymin);
};

function setGraphicsEdgeSegment(graphics, segment) {
    graphics.lineTo(segment.pe.x, segment.pe.y);
}

function setGraphicsEdgeArc(graphics, arc) {
    // let startAngle = 2 * Math.PI - arc.startAngle;
    // let endAngle = 2 * Math.PI - arc.endAngle;
    graphics.arc(arc.pc.x, arc.pc.y, arc.r, arc.startAngle, arc.endAngle, !arc.counterClockwise);
}

function setGraphicsEdge(graphics, edge) {
    if (edge.shape instanceof Segment) {
        setGraphicsEdgeSegment(graphics, edge.shape);
    }
    else if (edge.shape instanceof Arc) {
        setGraphicsEdgeArc(graphics, edge.shape);
    }
}

function setGraphicsFace(graphics, face) {
    let ps = face.first.start;
    graphics.moveTo(ps.x, ps.y);

    for (let edge of face) {
        setGraphicsEdge(graphics, edge);
    }
}

// Polygon.prototype.graphics = function(style) {
function graphics_polygon(polygon, style) {
    let graphics = new createjs.Graphics();
    let strokeStyle = style && style.strokeStyle ? style.strokeStyle : 1;
    let stroke = style && style.stroke ? style.stroke : "#FF0303";
    let fill = style && style.fill ? style.fill : "#FF0303";
    graphics.setStrokeStyle(strokeStyle,0,0,10,true);
    graphics.stroke = graphics.beginStroke(stroke).command;
    graphics.fill = graphics.beginFill(fill).command;

    for (let face of polygon.faces) {
        setGraphicsFace(graphics, face);
    }

    graphics.endStroke();
    return graphics;
};

