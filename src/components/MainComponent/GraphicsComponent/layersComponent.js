import React, {Component} from 'react';
import LayerComponent from "./layerComponent";
import LabelsLayerComponent from "./LabelsLayerComponent/labelsLayerComponent";
import VerticesLayerComponent from './verticesLayerComponent';
// import Layers from "../../../models/layers";

class LayersComponent extends Component {
    componentDidMount() {
        // if (this.props.layers.length > 0 && this.props.stage) {
        //     let affectedLayer = Layers.getAffected(this.props.layers);
        //     if (affectedLayer) {
        //         this.props.setHomeView(this.props.stage, affectedLayer);
        //     }
        // }
    }
    render() {
        return this.props.layers.map((layer) =>
            <React.Fragment key={layer.name}>

                <LayerComponent layer={layer} />

                <LabelsLayerComponent layer={layer} />

                <VerticesLayerComponent layer={layer} />
            </React.Fragment>
        )
    }
}

export default LayersComponent;
