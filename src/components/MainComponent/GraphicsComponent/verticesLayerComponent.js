import React from 'react'
import VerticesComponent from './graphics/verticesComponent';
import { connect } from "react-redux";

const verticesLayerComponent = (props) => {
    return (props.layer.displayed && props.displayVertices) ? (
        props.layer.shapes.map((shape, index) =>
            <VerticesComponent
                key={index}
                stage={props.stage}
                model={shape}
                color={props.layer.color}
                divisor={props.divisor}
                decimals={props.decimals}
                zoomFactor={props.zoomFactor}
                originX={props.originX}
                originY={props.originY}
            />
        )
    ) : null;
};

const mapStateToProps = (state) => {
    return {
        stage: state.app.stage,
        displayVertices: state.app.displayVertices,
        zoomFactor: state.app.zoomFactor,
        originX: state.app.originX,
        originaY: state.app.originY,
        divisor: state.app.divisor,
        decimals: state.app.decimals,
    }
};

const mapDispatchToProps = dispatch => {return {}};

export default connect(mapStateToProps, mapDispatchToProps)(verticesLayerComponent);
