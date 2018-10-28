import * as ActionTypes from "../action-types";
import {Distance} from "../../models/distance";

const defaultAabbDemoToolState = {
    aabbDemoToolActivated: false,
    measureShapesActive: false,
    measureShapesFirstClick: true,
    hoveredShape: null,
    firstMeasuredShape: null,
    secondMeasuredShape: null,
    firstMeasuredLayer: null,
    secondMeasuredLayer: null,
    distance: undefined,
    shortestSegment: null,
    firstMeasuredShapeLevel: [],
    secondMeasuredShapeLevel: [],
    min_stop: Number.POSITIVE_INFINITY,
    tree: null
};

const aabbDemoTool = (state = defaultAabbDemoToolState, action) => {
    let firstShapeNewLevel = [];
    let secondShapeNewLevel = [];
    let level = [];
    let min_stop = Number.POSITIVE_INFINITY;
    let tree = null;

    switch(action.type) {
        case ActionTypes.AABB_DEMO_URI:
            return Object.assign({}, state, {
                aabbDemoToolActivated: true
            });
        case ActionTypes.AABB_TREE_NEXT_LEVEL: {
            if (state.firstMeasuredShape) {
                if (state.firstMeasuredShapeLevel.length === 0) {
                    firstShapeNewLevel = [state.firstMeasuredShape.geom.edges.index.root];
                }
                else {
                    firstShapeNewLevel = [];
                    for (let node of state.firstMeasuredShapeLevel) {
                        if (!node.left.isNil()) {
                            firstShapeNewLevel.push(node.left);
                        }
                        if (!node.right.isNil()) {
                            firstShapeNewLevel.push(node.right);
                        }
                    }
                }
            }
            if (state.secondMeasuredShape) {
                if (state.secondMeasuredShapeLevel.length === 0) {
                    secondShapeNewLevel = [state.secondMeasuredShape.geom.edges.index.root];
                }
                else {
                    secondShapeNewLevel = [];
                    for (let node of state.secondMeasuredShapeLevel) {
                        if (!node.left.isNil()) {
                            secondShapeNewLevel.push(node.left);
                        }
                        if (!node.right.isNil()) {
                            secondShapeNewLevel.push(node.right);
                        }
                    }
                }
            }
            if (state.firstMeasuredShape || state.secondMeasuredShape) {
                return Object.assign({}, state, {
                    firstMeasuredShapeLevel: firstShapeNewLevel,
                    secondMeasuredShapeLevel: secondShapeNewLevel
                });
            }
            else {
                return state;
            }
        }
        case ActionTypes.MOUSE_CLICKED_ON_SHAPE:
            if (!state.aabbDemoToolActivated) {
                return state;
            }

            if (state.measureShapesFirstClick) {
                return Object.assign({}, state, {
                    firstMeasuredShape: action.shape,
                    firstMeasuredLayer: action.layer,
                    firstMeasuredShapeLevel: [],
                    secondMeasuredShapeLevel: [],
                    min_stop: Number.POSITIVE_INFINITY,
                    tree: null,
                    measureShapesFirstClick: false
                })
            }
            else {    // second click
                if (action.shape === state.firstMeasuredShape) {
                    return state;  // second click on the same shape
                }
                return Object.assign({}, state, {
                    secondMeasuredShape: action.shape,
                    secondMeasuredLayer: action.layer,
                    measureShapesFirstClick: true
                });
            }
        case ActionTypes.AABB_DEMO_NEXT_DIST_STEP:
            if (!state.aabbDemoToolActivated) {
                return state;
            }
            if (!state.firstMeasuredShape || !state.secondMeasuredShape) {
                return state;
            }
            if (state.secondMeasuredShapeLevel.length === 0) {
                level = [state.secondMeasuredShape.geom.edges.index.root];
                min_stop = Number.POSITIVE_INFINITY;
                tree = {}; // new IntervalTree();
            }
            else {
                [min_stop, level, tree] = Distance.minmax_tree_process_level(state.firstMeasuredShape,
                    state.secondMeasuredShapeLevel, state.min_stop, state.tree);
            }
            return Object.assign({}, state, {
                secondMeasuredShapeLevel: level,
                min_stop: min_stop,
                tree: tree
            });


        default:
            return state;
    }
};

export default aabbDemoTool;
