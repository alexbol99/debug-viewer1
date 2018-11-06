import React, {Component} from 'react';
import {LayerComponent} from "./layerComponent";
import LabelsLayerComponent from "./LabelsLayerComponent/labelsLayerComponent";

class LayersComponent extends Component {

    render() {
        return this.props.layers.map((layer) =>
            <React.Fragment key={layer.name}>
                <LayerComponent
                    stage={this.props.stage}
                    layer={layer}
                    color={layer.color}
                    displayed={layer.displayed}
                    displayVertices={this.props.displayVertices}
                    displayLabels={this.props.displayLabels}
                    widthOn={this.props.widthOn}
                    hoveredShape={this.props.hoveredShape}
                    firstMeasuredShape={this.props.firstMeasuredShape}
                    secondMeasuredShape={this.props.secondMeasuredShape}
                    zoomFactor={this.props.zoomFactor}
                    onMouseOver={this.props.onMouseOver}
                    onMouseOut={this.props.onMouseOut}
                    onClick={this.props.onClick}
                />
                <LabelsLayerComponent
                    stage={this.props.stage}
                    layer={layer}
                    displayed={layer.displayed}
                    displayLabels={this.props.displayLabels}

                />
            </React.Fragment>
        )
    }
}

export default LayersComponent;
