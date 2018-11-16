import /*React,*/ {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/appActions';
import * as layerActions from '../../store/actions/layersActions';
import * as cloudActions from '../../store/actions/cloudStorageActions';
import Layer from "../../models/layer";
import {parseJSON} from "../../dataParsers/parseJSON";

class CloudDocument extends Component {
    state={
        done:false
    };

    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            let stage = this.props.stage;

            cloudActions.fetchDocumentFromDatabase(this.props.match.params.id)
                .then( (response) => {
                    let firstLayer = undefined;
                    for (let layerData of response.data.layers) {
                        let layer = new Layer();
                        layer.shapes = parseJSON(layerData.shapes);
                        layer.name = layerData.name;

                        if (!firstLayer) firstLayer = layer;
                        this.props.addNewLayer(layer);
                        this.props.asyncOperationEnded();
                    }
                    this.props.updateDocument(this.props.match.params.id, response.data.name, "Alex Bol");
                    this.props.panAndZoomToShape(stage, firstLayer);
                    this.props.toggleLayer(firstLayer);
                });
            this.props.clearAll();
            this.setState({done:true});
            this.props.asyncOperationStarted();
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
        document: state.cloudStorage.document
    }
};

const mapDispatchToProps = dispatch => {
    return {
        panAndZoomToShape: (stage, layer) => dispatch(actions.setHomeView(stage, layer)),
        asyncOperationStarted: () => dispatch(actions.asyncOperationStarted()),
        asyncOperationEnded: () => dispatch(actions.asyncOperationEnded()),

        addNewLayer: (layer) => dispatch(layerActions.addNewLayer(layer)),
        toggleLayer: (layer) => dispatch(layerActions.toggleDisplayLayer(layer)),

        clearAll: () => dispatch(layerActions.deleteAllLayers()),
        updateDocument: (id, name, owner) => dispatch(cloudActions.requestFetchDocumentFromDatabaseSucceed(id, name, owner))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudDocument);
