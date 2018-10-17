import /*React,*/ {Component} from 'react';
import axios from "axios";

import {Layers} from "../../models/layers";
import {parseODB} from "../../models/parserODB";
import {Model} from "../../models/model";
import * as ActionTypes from "../../actions/action-types";

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

                    this.props.layers.push(layer);

                    this.props.dispatch({
                        type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
                        stage: stage,
                        shape: layer
                    })
                });
            this.setState({done:true})
        }
    }
    componentDidMount() {

    }
    render() {
        return null;
    }
}

export default Demo;