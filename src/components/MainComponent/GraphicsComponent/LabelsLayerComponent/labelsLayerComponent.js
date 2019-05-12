import React from 'react';
import LabelComponent from '../domelements/labelComponent';
import { connect } from "react-redux";

const labelsLayerComponent = (props) => {

    return (props.layer.displayed && props.displayLabels) ? (
        props.layer.shapes.map((shape, index) => {
                return (shape.label && shape.label.trim() !== "") ? (
                    <LabelComponent
                        key={index}
                        stage={props.stage}
                        shape={shape}
                        zoomFactor={props.zoomFactor}
                        originX={props.originX}
                        originY={props.originY}
                    />) : null;
            }
        )
    ) : null;
};

const mapStateToProps = (state) => {
    return {
        stage: state.app.stage,
        displayLabels: state.app.displayLabels,
        zoomFactor: state.app.zoomFactor,
        originX: state.app.originX,
        originY: state.app.originY
    }
};

const mapDispatchToProps = dispatch => {return {}};

export default connect(mapStateToProps, mapDispatchToProps)(labelsLayerComponent);
