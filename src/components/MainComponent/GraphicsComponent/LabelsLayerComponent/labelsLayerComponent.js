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
                    />) : null;
            }
        )
    ) : null;
};

const mapStateToProps = (state) => {
    return {
        stage: state.app.stage,
        displayLabels: state.app.displayLabels
    }
};

const mapDispatchToProps = dispatch => {return {}};

export default connect(mapStateToProps, mapDispatchToProps)(labelsLayerComponent);
