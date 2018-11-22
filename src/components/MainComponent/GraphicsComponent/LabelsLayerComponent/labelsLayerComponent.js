import React from 'react';
import LabelComponent from '../domelements/labelComponent';

const labelsLayerComponent = ({stage, layer, displayLabels}) => {
    return (layer.displayed && displayLabels) ? (
        layer.shapes.map((shape, index) => {
                return (shape.label && shape.label.trim() !== "") ? (
                    <LabelComponent
                        key={index}
                        stage={stage}
                        shape={shape}
                    />) : null;
            }
        )
    ) : null;
};

export default labelsLayerComponent;