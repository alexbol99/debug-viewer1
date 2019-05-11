/**
 * Created by alexanderbol on 19/06/2017.
 */
import React from 'react';
import VertexComponent from './vertexComponent';

const VerticesComponent = (props) => {

    return props.model.geom.vertices ?
        props.model.geom.vertices.map((vertex, index) =>
            <VertexComponent key={index}
                             stage={props.stage}
                             color={props.color}
                             zoomFactor={props.zoomFactor}
                             vertex={vertex}
            />
        ) : null;

}

export default VerticesComponent;