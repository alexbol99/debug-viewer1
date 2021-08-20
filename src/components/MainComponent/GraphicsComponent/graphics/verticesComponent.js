/**
 * Created by alexanderbol on 19/06/2017.
 */
import VertexComponent from './vertexComponent';

const VerticesComponent = (props) => {

    return props.model.geom.vertices ?
        props.model.geom.vertices.map((vertex, index) =>
            <VertexComponent key={index}
                             stage={props.stage}
                             vertex={vertex}
                             color={props.color}
                             divisor={props.divisor}
                             decimals={props.decimals}
                             zoomFactor={props.zoomFactor}
                             originX={props.originX}
                             originY={props.originY}
            />
        ) : null;

}

export default VerticesComponent;