/**
 * Created by alexanderbol on 17/04/2017.
 */

import Flatten from '@flatten-js/core';

export class Distance {
    /**
     }
     * Returns [mindist, maxdist] array of squared minimal and maximal distance between boxes
     * Minimal distance by x is
     *    (box2.xmin - box1.xmax), if box1 is left to box2
     *    (box1.xmin - box2.xmax), if box2 is left to box1
     *    0,                       if box1 and box2 are intersected by x
     * Minimal distance by y is defined in the same way
     *
     * Maximal distance is estimated as a sum of squared dimensions of the merged box
     *
     * @param box1
     * @param box2
     * @returns {Number | Number} - minimal and maximal distance
     */
    static box2box_minmax(box1, box2) {
        let mindist_x = Math.max(Math.max(box1.xmin - box2.xmax, 0), Math.max(box2.xmin - box1.xmax, 0));
        let mindist_y = Math.max(Math.max(box1.ymin - box2.ymax, 0), Math.max(box2.ymin - box1.ymax, 0));
        let mindist = mindist_x * mindist_x + mindist_y * mindist_y;

        let box = box1.merge(box2);
        let dx = box.xmax - box.xmin;
        let dy = box.ymax - box.ymin;
        let maxdist = dx * dx + dy * dy;

        return [mindist, maxdist];
    }

    static minmax_tree_process_level(shape, level, min_stop, tree) {
        // Calculate minmax distance to each shape in current level
        // Insert result into the interval tree for further processing
        // update min_stop with maxdist, it will be the new stop distance
        let mindist, maxdist;
        for (let node of level) {

            // [mindist, maxdist] = Distance.box2box_minmax(shape.box, node.max);
            // if (Flatten.Utils.GT(mindist, min_stop))
            //     continue;

            // Estimate min-max dist to the shape stored in the node.item, using node.item.key which is shape's box
            [mindist, maxdist] = Distance.box2box_minmax(shape.box, node.item.key);
            if (node.item.value instanceof Flatten.Edge) {
                tree.insert([mindist, maxdist], node.item.value.shape);
            }
            else {
                tree.insert([mindist, maxdist], node.item.value);
            }
            if (Flatten.Utils.LT(maxdist, min_stop)) {
                min_stop = maxdist;                       // this will be the new distance estimation
            }
        }

        if (level.length === 0)
            return [min_stop, level, tree];

        // Calculate new level from left and right children of the current
        let new_level_left = level.map(node => node.left.isNil() ? undefined : node.left).filter(node => node !== undefined);
        let new_level_right = level.map(node => node.right.isNil() ? undefined : node.right).filter(node => node !== undefined);
        // Merge left and right subtrees and leave only relevant subtrees
        let new_level = [...new_level_left, ...new_level_right].filter(node => {
            // Node subtree quick reject, node.max is a subtree box
            let mindist = Distance.box2box_minmax(shape.box, node.max)[0];
            return (Flatten.Utils.LE(mindist, min_stop));
        });

        // min_stop = Distance.minmax_tree_process_level(shape, new_level, min_stop, tree);
        return [min_stop, new_level, tree];
    }

    /**
     * Calculates sorted tree of [mindist, maxdist] intervals between query shape
     * and shapes of the planar set.
     * @param shape
     * @param set
     */
    static minmax_tree(shape, set, min_stop) {
        let tree = new Flatten.IntervalTree();
        let level = [set.index.root];
        let squared_min_stop = min_stop < Number.POSITIVE_INFINITY ? min_stop * min_stop : Number.POSITIVE_INFINITY;
        Distance.minmax_tree_process_level(shape, level, squared_min_stop, tree);
        return tree;
    }

    static minmax_tree_calc_distance(shape, node, min_dist_and_segment) {
        let min_dist_and_segment_new, stop;
        if (node != null && !node.isNil()) {
            [min_dist_and_segment_new, stop] = Distance.minmax_tree_calc_distance(shape, node.left, min_dist_and_segment);

            if (stop) {
                return [min_dist_and_segment_new, stop];
            }

            if (Flatten.Utils.LT(min_dist_and_segment_new[0], Math.sqrt(node.item.key.low))) {
                return [min_dist_and_segment_new, true];   // stop condition
            }

            let [dist, shortest_segment] = Distance.distance(shape, node.item.value);
            // console.log(dist)
            if (Flatten.Utils.LT(dist, min_dist_and_segment_new[0])) {
                min_dist_and_segment_new = [dist, shortest_segment];
            }

            [min_dist_and_segment_new, stop] = Distance.minmax_tree_calc_distance(shape, node.right, min_dist_and_segment_new);

            return [min_dist_and_segment_new, stop];
        }

        return [min_dist_and_segment, false];
    }
    static shape2planarSet(shape, set, min_stop = Number.POSITIVE_INFINITY) {
        let min_dist_and_segment = [min_stop, new Flatten.Segment()];
        // eslint-disable-next-line
        let stop = false;
        if (set instanceof Flatten.PlanarSet) {
            let tree = Distance.minmax_tree(shape, set, min_stop);
            [min_dist_and_segment, stop] = Distance.minmax_tree_calc_distance(shape, tree.root, min_dist_and_segment);
        }
        return min_dist_and_segment;
    }
}
