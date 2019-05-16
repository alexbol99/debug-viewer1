import /*React,*/ {Component} from 'react';
import axios from "axios";

import Layers from "../../models/layers";
// import {parseODB} from "../../dataParsers/parserODB";
import {parseTXT} from "../../dataParsers/parseTXT";
import Model from "../../models/model";
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

            // let url1 = "https://gist.githubusercontent.com/alexbol99/e8ff96c445fc58da5d0f66ccf58d9282/raw/be4273f3b68b104e02f918495592d8308a066344/poly1.txt";
            // let url2 = "https://gist.githubusercontent.com/alexbol99/b445045a8bbb41b4bde7724b5e474ddf/raw/705314f25757633c6a3d9199d5be101028ea0316/poly2.txt";
            // let url3 = "https://gist.githubusercontent.com/alexbol99/715dc06c8295f90ef18385a0d8040d5c/raw/c95c46c0eae9069d004480ccd0ac80ca89e818f2/poly3.txt";
            // let url4 = "https://gist.githubusercontent.com/alexbol99/1226284eb0c0ac3aa9c645d9f7849eb5/raw/a35baaadb8d9e5e0580d33cf4546bf0d05ad37dc/poly4.txt";
            let url234 = "https://gist.githubusercontent.com/alexbol99/e570fe783be88b556f4ca4b332da73f7/raw/741c87a7ceccdeadd9fbbac05bdfda22ebe94927/poly234.txt";

            // axios("https://gist.githubusercontent.com/alexbol99/825fdf2dd508467cc852eb22aa36183d/raw/d10e853338afd8294eeb3ffdebe3bc380477a978/features")

            Promise.all([axios(url234)])
                .then( (responses) => {
                    for (let i=0; i < 1; i++) {
                        let resp = responses[i];
                        let layer = Layers.newLayer(stage, layers);
                        layer.color = Layers.getNextColor(layers);
                        layer.name = "poly";
                        layer.title = "";
                        layer.affected = false;
                        layer.displayed = true;

                        let job = parseTXT(layer.name, resp.data);

                        for (let shape of job.shapes) {
                            let model = new Model(shape, undefined, shape.label);
                            layer.add(model);
                        }

                        this.props.panAndZoomToShape(stage, layer);
                        this.props.addNewLayer(layer);
                        this.props.asyncOperationEnded();
                    }
                })
                .catch( error => {
                    console.log(error);
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
