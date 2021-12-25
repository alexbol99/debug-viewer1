import {Fragment} from 'react';
import LayerComponent from "./layerComponent";
import LabelsLayerComponent from "./LabelsLayerComponent/labelsLayerComponent";
import VerticesLayerComponent from './verticesLayerComponent';

const LayersComponent = ({layers, widthOn, displayVertices, displayLabels, zoomFactor}) => {
    return layers.map((layer) =>
        <Fragment key={layer.name}>
            <LayerComponent
                layer={layer}
                widthOn={widthOn}
                displayVertices={displayVertices}
                zoomFactor={zoomFactor}
            />

            <LabelsLayerComponent
                layer={layer}
                displayLabels={displayLabels}
            />

            <VerticesLayerComponent
                layer={layer}
                displayVertices={displayVertices}
            />
        </Fragment>
    )
}

export default LayersComponent
