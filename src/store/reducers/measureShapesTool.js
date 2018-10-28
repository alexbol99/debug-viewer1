import * as ActionTypes from "../action-types";
import Flatten from "flatten-js";

const defaultMeasureShapesTool = {
    measureShapesActive: false,
    measureShapesFirstClick: true,
    hoveredShape: null,
    firstMeasuredShape: null,
    secondMeasuredShape: null,
    firstMeasuredLayer: null,
    secondMeasuredLayer: null,
    distance: undefined,
    shortestSegment: null
};

const measureShapesTool = (state = defaultMeasureShapesTool, action) => {
    switch (action.type) {
        case ActionTypes.MEASURE_SHAPES_BUTTON_PRESSED:
            return Object.assign({}, defaultMeasureShapesTool, {
                measureShapesActive: true
            });
        case ActionTypes.PAN_BY_DRAG_BUTTON_CLICKED:
            return Object.assign({}, defaultMeasureShapesTool);

        case ActionTypes.MEASURE_POINTS_BUTTON_PRESSED:
            return Object.assign({}, defaultMeasureShapesTool);

        case ActionTypes.MOUSE_ROLL_OVER_SHAPE:
            return Object.assign({}, state, {
                hoveredShape: state.measureShapesActive ? action.shape : null
            });
        case ActionTypes.MOUSE_ROLL_OUT_SHAPE:
            return Object.assign({}, state, {
                hoveredShape: null
            });
        case ActionTypes.MOUSE_CLICKED_ON_SHAPE:
            if (!state.measureShapesActive) {
                return state;
            }
            // measureShapesActive

            if (state.measureShapesFirstClick) {
                return Object.assign({}, state, {
                    firstMeasuredShape: action.shape,
                    firstMeasuredLayer: action.layer,
                    secondMeasuredShape: null,
                    secondMeasuredLayer: null,
                    measureShapesFirstClick: false,
                    distance: undefined,
                    shortestSegment: null
                })
            }
            else {    // second click
                if (action.shape === state.firstMeasuredShape) {
                    return state;  // second click on the same shape
                }

                let shape1 = state.firstMeasuredShape.geom;
                let shape2 = action.shape.geom;
                let distance, shortestSegment;
                // if (shape1 instanceof Flatten.Polygon && shape2 instanceof Flatten.Polygon) {
                //     [distance, shortestSegment] = Flatten.Distance.polygon2polygon(shape1, shape2);
                // }
                // else {
                [distance, shortestSegment] = Flatten.Distance.distance(shape1, shape2);
                // }


                return Object.assign({}, state, {
                    secondMeasuredShape: action.shape,
                    secondMeasuredLayer: action.layer,
                    measureShapesFirstClick: true,
                    distance: distance,
                    shortestSegment: shortestSegment
                });
            }
        case ActionTypes.MOUSE_DOWN_ON_STAGE:
            if (state.hoveredShape) {
                return state
            }
            else {
                return Object.assign({}, state, {
                    measureShapesFirstClick: true,
                    firstMeasuredShape: null,
                    firstMeasuredLayer: null,
                    secondMeasuredShape: null,
                    secondMeasuredLayer: null,
                    distance: undefined,
                    shortestSegment: null
                });
            }

        case ActionTypes.DELETE_LAYER_BUTTON_PRESSED:
            if (action.layer === state.firstMeasuredLayer ||
                action.layer === state.secondMeasuredLayer) {
                return Object.assign({}, defaultMeasureShapesTool);
            }
            else {
                return state;
            }

        case ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED:
            if (action.layer.displayed &&
                (action.layer === state.firstMeasuredLayer ||
                    action.layer === state.secondMeasuredLayer)) {
                return Object.assign({}, defaultMeasureShapesTool);
            }
            else {
                return state;
            }

        default:
            return state;
    }
}

export default measureShapesTool;