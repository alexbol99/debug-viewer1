import /*React,*/ {Component} from 'react';
import { connect } from 'react-redux';
import axios from "../../axios-database";

import * as ActionTypes from "../../store/actionTypes";
import * as actions from '../../store/actions/appActions';
import Layer from "../../models/layer";
import Flatten from "flatten-js";

class CloudDocument extends Component {
    state={
        done:false
    };

    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;
            let layers = this.props.layers;

            axios.get('/documents/' + this.props.match.params.id + '.json')
                .then( (response) => {
                    for (let data of response.data.layers) {
                        let layer = new Layer();

                        let shapes = JSON.parse(data.shapes);

                        for (let shape of shapes) {
                            if (shape.geom instanceof Array) {
                                let polygon = new Flatten.Polygon();
                                for (let faceArray of shape.geom) {
                                    polygon.addFace(faceArray);
                                }
                                layer.add(polygon);
                            }
                            else {
                                layer.add(shape);
                            }
                        }

                        layer.name = data.name;
                        // layer.title = data.title;
                        // layers.push(layer);

                        this.props.panAndZoomToShape(stage, layer);
                        this.props.addNewLayer(layer);
                        this.props.toggleLayer(layer);

                        this.props.asyncOperationEnded();
                    }



                });
            this.setState({done:true});
            this.props.asyncOperationStarted();
        }
    }
    componentDidMount() {

    }
    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        layers: state.layers,
        stage: state.app.stage,
        document: state.cloudStorage.document
    }
};

const mapDispatchToProps = dispatch => {
    return {
        panAndZoomToShape: (stage, layer) => dispatch({
            type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
            stage: stage,
            shape: layer
        }),
        addNewLayer: (layer) => dispatch({
            type: ActionTypes.ADD_NEW_LAYER,
            layer: layer
        }),
        toggleLayer: (layer) => dispatch({
            type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
            layer: layer
        }),
        asyncOperationStarted: () => dispatch(actions.asyncOperationStarted()),
        asyncOperationEnded: () => dispatch(actions.asyncOperationEnded())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudDocument);
