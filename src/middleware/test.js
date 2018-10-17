import * as ActionTypes from '../actions/action-types';
import { Layers } from '../models/layers';
// import { Shape } from '../models/shape';
import { Model } from "../models/model";

// import { parseXML } from '../models/parserXML';
// import file1 from '../../public/test_xml_0.xml';
import file1 from '../../public/polygon.txt';

const demo = ({ dispatch, getState }) => next => action => {

    if (action.type === ActionTypes.NEW_STAGE_CREATED) {
        if (document.location.pathname === '/test') {
            // console.log(document.location.pathname);
            // console.log(getState());
            let str = file1;
            let text = atob(str.split(',')[1]);

            let stage = action.stage;
            let state = getState();
            let parser = state.app.parser;
            let layers = state.layers;

            let polygon = parser.parseToPolygon(text);

            let layer = Layers.newLayer(stage, layers);
            layer.name = "demo1";
            layer.title = "demo1";

            let model = new Model(polygon);

            let box = polygon.box;
            let x = (box.xmin + box.xmax)/2;
            let y = (box.ymin + box.ymax)/2;

            stage.panToCoordinate(x, y);
            stage.zoomToLimits(box.xmax - box.xmin, box.ymax - box.ymin);

            model.origin = stage.origin;
            model.zoomFactor = stage.zoomFactor;

            // element.geomTransformed =
            //     StageElement.transformPolygon(polygon, stage);

            layer.add(model);

            state.layers.push(layer);

            // dispatch({
            //     type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
            //     shape: layer
            // })
        }
    }
    return next(action);
};


export default demo;
