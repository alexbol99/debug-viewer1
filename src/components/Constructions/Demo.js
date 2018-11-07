import /*React,*/ {Component} from 'react';
import axios from "axios";

import {Layers} from "../../models/layers";
import {parseODB} from "../../models/parserODB";
import {Model} from "../../models/model";
import * as ActionTypes from "../../store/actionTypes";
import * as actions from '../../store/actions/appActions';
import { connect } from 'react-redux';

class Demo extends Component {
    state={
        done:false
    };
    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;
            let layers = this.props.layers;

            let layer = Layers.newLayer(stage, layers);
            layer.color = Layers.getNextColor(layers);
            layer.name = "features";
            layer.title = "features";
            layer.affected = true;
            layer.displayed = true;

            axios("https://gist.githubusercontent.com/alexbol99/825fdf2dd508467cc852eb22aa36183d/raw/d10e853338afd8294eeb3ffdebe3bc380477a978/features")
                .then( (resp) => {
                    let job = parseODB("features", resp.data);

                    for (let shape of job.shapes) {
                        let model = new Model(shape, undefined, shape.label);
                        layer.add(model);
                    }

                    this.props.panAndZoomToShape(stage, layer);
                    this.props.addNewLayer(layer);
                    this.props.asyncOperationEnded();
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
        stage: state.app.stage
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
        asyncOperationStarted: () => dispatch(actions.asyncOperationStarted()),
        asyncOperationEnded: () => dispatch(actions.asyncOperationEnded())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Demo);
