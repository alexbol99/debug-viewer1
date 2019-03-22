import Flatten from "@flatten-js/core";
import {Vector, Segment, Arc, Line, Box, Polygon} from "@flatten-js/core";
// let Flatten = require('flatten-js');

// let {Vector, Segment, Arc, Line, Box, Polygon} = Flatten;

class CollisionDistance {
    static apply(polygon1, polygon2) {
        let collision_distance = Number.POSITIVE_INFINITY;
        for (let edge of [...polygon2.edges]) {
            let distance = CollisionDistance.edge2polygon(edge, polygon1);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static edge2polygon(edge2, polygon1) {
        let shapeBox = edge2.shape.box;
        let box = new Box(
            Number.NEGATIVE_INFINITY,
            shapeBox.ymin,
            Number.POSITIVE_INFINITY,
            shapeBox.ymax
        );
        let collision_distance = Number.POSITIVE_INFINITY;
        let resp_edges =  polygon1.edges.search(box);
        for (let edge1 of resp_edges) {
            let distance;
            if (edge1.shape instanceof Segment && edge2.shape instanceof Segment) {
                distance = CollisionDistance.segment2segment(edge1.shape, edge2.shape);
            }
            else if (edge1.shape instanceof Arc && edge2.shape instanceof Segment) {
                distance = CollisionDistance.segment2arc(edge2.shape, edge1.shape);
            }
            else if (edge1.shape instanceof Segment && edge2.shape instanceof Arc) {
                distance = CollisionDistance.segment2arc(edge1.shape, edge2.shape);
            }
            else if (edge1.shape instanceof Arc && edge2.shape instanceof Arc) {
                distance = CollisionDistance.arc2arc(edge1.shape, edge2.shape);
            }

            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static point2shape(point, shape) {
        let line = new Line(point, new Vector(0,1));
        let intersections = line.intersect(shape);          // segment or arc
        let collision_distance = Number.POSITIVE_INFINITY;
        for (let ip of intersections) {
            // eslint-disable-next-line
            let [distance, shortest_segment] = point.distanceTo(ip);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static segment2segment(segment1, segment2) {
        let collision_distance = Number.POSITIVE_INFINITY;
        for (let point of segment1.vertices) {
            let distance = CollisionDistance.point2shape(point, segment2);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        for (let point of segment2.vertices) {
            let distance = CollisionDistance.point2shape(point, segment1);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static segment2arc(segment, arc) {
        let collision_distance = Number.POSITIVE_INFINITY;
        let v_s = new Vector(segment.start, segment.end);
        v_s = v_s.normalize();

        let v_n = [v_s.rotate90CCW().multiply(arc.r), v_s.rotate90CW().multiply(arc.r)];
        let distance;

        // Distance between tangent point and segment
        for (let v of v_n) {
            let tangent_point = arc.center.translate(v);  // tangent point in direction of the normal vector
            if (tangent_point.on(arc)) {
                distance = CollisionDistance.point2shape(tangent_point, segment);
                if (distance < collision_distance) {
                    collision_distance = distance;
                }
            }
        }

        for (let point of arc.vertices) {
            let distance = CollisionDistance.point2shape(point, segment);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        for (let point of segment.vertices) {
            let distance = CollisionDistance.point2shape(point, arc);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static arc2arc(arc1, arc2) {
        let collision_distance = Number.POSITIVE_INFINITY;
        let distance;

        // test translation of arc2.center to arc1 enlarged by r2
        let arc_enlarged = arc1.clone();
        arc_enlarged.r += arc2.r;
        distance = CollisionDistance.point2shape(arc2.center, arc_enlarged);
        if (distance < collision_distance) {
            // additional check that transformed arc actually touching
            // eslint-disable-next-line
            let [dist_tmp, shortest_segment_tmp] =
                arc1.distanceTo( CollisionDistance.translateArc(arc2, new Vector(-distance,0)));
            if (Flatten.Utils.EQ_0(dist_tmp)) {
                collision_distance = distance;
            }
        }

        // test translation of arc2.center to arc1 reduced by r2
        if (Flatten.Utils.GE(arc1.r, arc2.r)) {
            let arc_reduced = arc1.clone();
            arc_reduced.r -= arc2.r;
            distance = CollisionDistance.point2shape(arc2.center, arc_reduced);
            if (distance < collision_distance) {
                // additional check that transformed arc actually touching
                // eslint-disable-next-line
                let [dist_tmp, shortest_segment_tmp] =
                    arc1.distanceTo( CollisionDistance.translateArc(arc2, new Vector(-distance,0)));
                if (Flatten.Utils.EQ_0(dist_tmp)) {
                    collision_distance = distance;
                }
            }
        }

        // test translation of arc1.center to arc2 reduced by r1
        if (Flatten.Utils.LT(arc1.r, arc2.r)) {
            let arc_reduced = arc2.clone();
            arc_reduced.r -= arc1.r;
            distance = CollisionDistance.point2shape(arc1.center, arc_reduced);
            if (distance < collision_distance) {
                // additional check that transformed arc actually touching
                // eslint-disable-next-line
                let [dist_tmp, shortest_segment_tmp] =
                    arc1.distanceTo( CollisionDistance.translateArc(arc2, new Vector(-distance,0)));
                if (Flatten.Utils.EQ_0(dist_tmp)) {
                    collision_distance = distance;
                }
            }
        }

        for (let point of arc1.vertices) {
            let distance = CollisionDistance.point2shape(point, arc2);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        for (let point of arc2.vertices) {
            let distance = CollisionDistance.point2shape(point, arc1);
            if (distance < collision_distance) {
                collision_distance = distance;
            }
        }
        return collision_distance;
    }

    static translateArc(arc, vec) {
        let arc_tmp = arc.clone();
        arc_tmp.pc = arc_tmp.pc.translate(vec);
        return arc_tmp;
    }

    static translate(polygon, vec) {
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

};

CollisionDistance.Flatten = Flatten;

export default CollisionDistance;
