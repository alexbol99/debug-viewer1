import /*React,*/ {Component} from 'react';
import { connect } from 'react-redux';
import axios from "../../axios-database";

import * as ActionTypes from "../../store/actionTypes";
import * as actions from '../../store/actions/appActions';
import Layer from "../../models/layer";
// import Model from "../../models/model";
// import Flatten from "flatten-js";
import { parseJSON} from "../../dataParsers/parseJSON";

class CloudDocument extends Component {
    state={
        done:false
    };

    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;

            axios.get('/documents/' + this.props.match.params.id + '.json')
                .then( (response) => {
                    for (let data of response.data.layers) {
                        let layer = new Layer();

                        layer.shapes = parseJSON(data.shapes);
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
