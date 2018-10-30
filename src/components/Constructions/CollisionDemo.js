import /*React,*/ {Component} from 'react';
import Flatten from 'flatten-js';
import CollisionDistance from "../../models/collisionDistance";
import axios from "axios";
import {Layers} from "../../models/layers";
// import {Model} from "../../models/model";
import * as ActionTypes from "../../store/actionTypes";
import { connect } from "react-redux";

let {vector} = Flatten;

class CollisionDemo extends Component {
    state={
        done:false,
        data:[]
    };
    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;
            let layers = this.props.layers;

            let layer = Layers.newLayer(stage, layers);
            layer.color = Layers.getNextColor(layers);
            layer.name = "collision_demo";
            layer.title = "collision_demo";
            layer.affected = true;
            layer.displayed = true;

            axios("https://gist.githubusercontent.com/alexbol99/81893d40ec5eaa00d0336c35e069dd73/raw/b9328a4c6d7d6a44f375c68b4ec207690f40fd19/Block_53388_2parts_Cont.txt")
                .then( (resp) => {
                    let parser = this.props.parser;
                    let polygon1 = parser.parseToPolygon(resp.data);
                    layer.add(polygon1);

                    let vec = vector( 2*(polygon1.box.xmax - polygon1.box.xmin), 0 );
                    let polygon2 = polygon1.translate(vec);
                    layer.add(polygon2);

                    let collision = CollisionDistance.apply(polygon2, polygon1);
                    let polygon3 = polygon2.translate(vector(-collision, 0));
                    layer.add(polygon3);

                    // layers.push(layer);

                    this.props.panAndZoomToShape(stage, layer);
                    this.props.addNewLayer(layer);
                    this.props.applyCollisionDemo();
                });
            this.setState({done:true})
        }
    }
    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        layers: state.layers,
        stage: state.app.stage,
        parser: state.app.parser
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
        applyCollisionDemo: () => dispatch({
            type: ActionTypes.COLLISION_DEMO_URI
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CollisionDemo);
