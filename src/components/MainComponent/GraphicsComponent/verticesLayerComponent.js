import React from 'react'
import VerticesComponent from './graphics/verticesComponent';

const verticesLayerComponent = ({stage, layer, displayVertices, color, zoomFactor}) => {
    return (layer.displayed && displayVertices) ? (
        layer.shapes.map((shape, index) =>

                    <VerticesComponent
                        key={index}
                        stage={stage}
                        model={shape}
                        color={color}
                        zoomFactor={zoomFactor}
                    />
        )
    ) : null;
};

export default verticesLayerComponent;