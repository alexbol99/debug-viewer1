import React, {Component} from 'react';
import {LayerComponent} from "./layerComponent";

class LayersComponent extends Component {

    render() {
        return this.props.layers.map((layer) =>
            <LayerComponent
                key={layer.name}
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
            />)
    }
}

export default LayersComponent;
