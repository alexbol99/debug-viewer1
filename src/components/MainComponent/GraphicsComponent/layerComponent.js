import {Component} from 'react';
import {ShapeComponent} from './graphics/shapeComponent';
import {ImageComponent} from "./graphics/imageComponent";
import { connect } from "react-redux";
import * as actions from "../../../store/actions/appActions";

class LayerComponent extends Component {
    onImageLoaded = (model, layer, image) => {
        this.props.setHomeView(this.props.stage, this.props.layer);
        this.forceUpdate();       // ??? unclear why on Home button click not updated
    }

    render() {
        return (
            this.props.layer.shapes.map((shape, index) => {
                return shape.geom.uri ? (
                    <ImageComponent
                        key={index}
                        stage={this.props.stage}
                        layer={this.props.layer}
                        model={shape}
                        displayed={this.props.layer.displayed}
                        hovered={shape === this.props.hoveredShape}
                        selected={
                            shape === this.props.firstMeasuredShape ||
                            shape === this.props.secondMeasuredShape
                        }
                        color={this.props.layer.color}
                        widthOn={this.props.widthOn}
                        displayLabels={this.props.displayLabels}
                        zoomFactor={this.props.zoomFactor}
                        onMouseOver={this.props.onMouseOver}
                        onMouseOut={this.props.onMouseOut}
                        onClick={this.props.onClick}
                        onImageLoaded={this.onImageLoaded}
                    />
                    ) : (
                    <ShapeComponent
                        key={index}
                        stage={this.props.stage}
                        layer={this.props.layer}
                        model={shape}
                        displayed={this.props.layer.displayed}
                        hovered={shape === this.props.hoveredShape}
                        selected={
                            shape === this.props.firstMeasuredShape ||
                            shape === this.props.secondMeasuredShape
                        }
                        color={this.props.layer.color}
                        widthOn={this.props.widthOn}
                        displayVertices={this.props.displayVertices}
                        zoomFactor={this.props.zoomFactor}
                        onMouseOver={this.props.handleMouseRollOverShape}
                        onMouseOut={this.props.handleMouseRollOutShape}
                        onClick={this.props.handleClickOnShape}
                    /> )
                }
            )
        )
    }
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
