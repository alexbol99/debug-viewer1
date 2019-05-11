import React from 'react'
import VerticesComponent from './graphics/verticesComponent';
import { connect } from "react-redux";

const verticesLayerComponent = ({stage, layer, displayVertices, zoomFactor}) => {
    return (layer.displayed && displayVertices) ? (
        layer.shapes.map((shape, index) =>
            <VerticesComponent
                key={index}
                stage={stage}
                model={shape}
                color={layer.color}
                zoomFactor={zoomFactor}
            />
        )
    ) : null;
};

const mapStateToProps = (state) => {
    return {
        stage: state.app.stage,
        displayVertices: state.app.displayVertices,
        zoomFactor: state.app.zoomFactor,
        divisor: state.app.divisor,
        decimals: state.app.decimals
    }
};

const mapDispatchToProps = dispatch => {return {}};

export default connect(mapStateToProps, mapDispatchToProps)(verticesLayerComponent);
