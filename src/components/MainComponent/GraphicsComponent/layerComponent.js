import {ShapeComponent} from './graphics/shapeComponent';
import {ImageComponent} from "./graphics/imageComponent";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/appActions";

const LayerComponent = (props) => {
    const onImageLoaded = (model, layer, image) => {
        props.setHomeView(props.stage, props.layer);
        //this.forceUpdate();       // ??? unclear why on Home button click not updated
    }

    return (
        props.layer.shapes.map((shape, index) => {
                return shape.geom.uri ? (
                    <ImageComponent
                        key={index}
                        stage={props.stage}
                        layer={props.layer}
                        model={shape}
                        displayed={props.layer.displayed}
                        hovered={shape === props.hoveredShape}
                        selected={
                            shape === props.firstMeasuredShape ||
                            shape === props.secondMeasuredShape
                        }
                        color={props.layer.color}
                        widthOn={props.widthOn}
                        displayLabels={props.displayLabels}
                        zoomFactor={props.zoomFactor}
                        onMouseOver={props.onMouseOver}
                        onMouseOut={props.onMouseOut}
                        onClick={props.onClick}
                        onImageLoaded={onImageLoaded}
                    />
                ) : (
                    <ShapeComponent
                        key={index}
                        stage={props.stage}
                        layer={props.layer}
                        model={shape}
                        displayed={props.layer.displayed}
                        hovered={shape === props.hoveredShape}
                        selected={
                            shape === props.firstMeasuredShape ||
                            shape === props.secondMeasuredShape
                        }
                        color={props.layer.color}
                        widthOn={props.widthOn}
                        displayVertices={props.displayVertices}
                        zoomFactor={props.zoomFactor}
                        onMouseOver={props.handleMouseRollOverShape}
                        onMouseOut={props.handleMouseRollOutShape}
                        onClick={props.handleClickOnShape}
                    />)
            }
        )
    )
}

const mapStateToProps = (state) => {
    return {
        stage: state.app.stage,
        layers: state.layers,
        displayVertices: state.app.displayVertices,
        displayLabels: state.app.displayLabels,
        widthOn: state.app.widthOn,
        zoomFactor: state.app.zoomFactor,
        units: state.app.units,
        divisor: state.app.divisor,
        decimals: state.app.decimals,
        measurePointsActive: state.app.measurePointsActive,
        showAboutPopup: state.app.showAboutPopup,
        showDownloadPopup: state.app.showDownloadPopup,
        showUploadPopup: state.app.showUploadPopup,
        measureShapesTool: state.measureShapesTool,
        hoveredShape: state.measureShapesTool.hoveredShape,
        firstMeasuredShape: state.measureShapesTool.firstMeasuredShape,
        secondMeasuredShape: state.measureShapesTool.secondMeasuredShape
    }
};

const mapDispatchToProps = dispatch => {
    return {
        setHomeView: (stage, shape) => dispatch(actions.setHomeView(stage, shape)),
        handleMouseRollOverShape: (shape) => dispatch(actions.handleMouseRollOverShape(shape)),
        handleMouseRollOutShape: () => dispatch(actions.handleMouseRollOutShape()),
        handleClickOnShape: (shape, layer) => dispatch(actions.handleClickOnShape(shape, layer)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayerComponent);
