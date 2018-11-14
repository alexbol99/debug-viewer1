/**
 * Created by alexanderbol on 17/04/2017.
 */

import React, {Component} from 'react';
import ToolbarComponent from '../../components/MainComponent/ToolbarComponent/ToolbarComponent';
import CanvasComponent from '../../components/MainComponent/CanvasComponent/CanvasComponent';
import StatusComponent from '../../components/Layout/StatusComponent/StatusComponent';

import StageComponent from "../../components/MainComponent/GraphicsEditor/stageComponent";
import LayersComponent from '../../components/MainComponent/GraphicsEditor/layersComponent';

import * as actions from '../../store/actions/appActions';

import Layers from '../../models/layers';
import MeasurePointsTool from '../../tools/measurePointsTool';
import MeasureShapesTool from "../../tools/measureShapesTool";
import DisplayCoordsTool from "../../tools/displayCoordsTool";

import ModalPopup from "../../components/UI/ModalPopup/ModalPopup";
import AboutPopup from "../../components/AboutPopup/AboutPopup";

import styles from './MainComponent.module.css';
import { connect } from "react-redux";

class MainComponent extends Component {
    handleFileSelect = (event) => {
        if (!(File && FileReader && FileList)) return;
        let files = event.target.files; // FileList object
        this.props.handleFileSelect(files, this.props.stage, this.props.layers);
    };

    setHomeView = () => {
        let layer = Layers.getAffected(this.props.layers);
        if (!layer) return;
        this.props.setHomeView(this.props.stage, layer);
    };

    handleKeyDown = (e) => {
        // let ctrl = e.ctrlKey;
        if (e.target.id !== "mainCanvas")
            return;
        switch (e.code) {
            case "KeyH":
                this.setHomeView();
                break;

            case "KeyW":
                this.props.toggleWidthMode();     // toggle width On/Off in graphics model
                break;

            case "KeyE":
                this.props.toggleDisplayVertices();  // toggle vertices On/Off
                break;

            case "ArrowRight":
                break;

            case "ArrowLeft":
                break;
            case "ArrowUp":
                break;
            case "ArrowDown":
                break;
            default:
                break;
        }
    };

    componentDidMount() {
        window.onresize = this.props.resizeStage;
        // Keyboard event
        // var _keydown = _.throttle(this.keydown, 100);
        document.addEventListener('keydown', this.handleKeyDown);
        // var _keyup = _.throttle(this.keyup, 500);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    render() {
        let displayCoordsTool = this.props.stage ? (
            <DisplayCoordsTool
                key="displayCoordinatedTool"
                stage={this.props.stage}
                units={this.props.units}
                divisor={this.props.divisor}
                decimals={this.props.decimals}
                coordX={this.props.mouse.x}
                coordY={this.props.mouse.y}
            />
        ) : null;

        let measurePointsTool = this.props.measurePointsActive ? <MeasurePointsTool /> : null;

        let measuredLayersDisplayed = this.props.measureShapesTool.firstMeasuredShape &&
            this.props.measureShapesTool.secondMeasuredShape &&
            this.props.measureShapesTool.firstMeasuredLayer.displayed &&
            this.props.measureShapesTool.secondMeasuredLayer.displayed;

        let measureShapesTool = this.props.measureShapesTool.distance &&
        this.props.measureShapesTool.shortestSegment && measuredLayersDisplayed ? (
            <MeasureShapesTool
                key="MeasureShapesTool"
                stage={this.props.stage}
                firstMeasuredShape={this.props.measureShapesTool.firstMeasuredShape}
                secondMeasuredShape={this.props.measureShapesTool.secondMeasuredShape}
                firstMeasuredLayer={this.props.measureShapesTool.firstMeasuredLayer}
                secondMeasuredLayer={this.props.measureShapesTool.secondMeasuredLayer}
                distance={this.props.measureShapesTool.distance}
                shortestSegment={this.props.measureShapesTool.shortestSegment}
                divisor={this.props.divisor}
                decimals={this.props.decimals}
            />
        ) : null;

        return (
            <main className={styles["Main-content"]}>
                <ToolbarComponent
                    measurePointsActive={this.props.measurePointsActive}
                    units={this.props.units}
                    showSkeletonRecognitionButton={this.props.showSkeletonRecognitionButton}
                    onFileSelected={this.handleFileSelect}
                    onHomeButtonPressed={this.setHomeView}
                    onPanByDragPressed={this.props.togglePanByDrag}
                    onMeasurePointsButtonPressed={this.props.toggleMeasureBetweenPoints}
                    onMeasureBetweenShapesButtonPressed={this.props.toggleMeasureBetweenShapes}
                    onToggleWidthModePressed={this.props.toggleWidthMode}
                    onToggleVerticesPressed={this.props.toggleDisplayVertices}
                    onToggleLabelsPressed={this.props.toggleDisplayLabels}
                    onShowAboutPopupPressed={this.props.toggleAboutPopup}
                    onSkeletonRecognitionButtonPressed={this.props.applySkeletonRecognition}
                    onUnitClicked={this.props.toggleUnits}
                    onSaveDocumentButtonClicked={this.props.onSaveDocumentButtonClicked}
                    onManageCloudStorageButtonClicked={this.props.onManageCloudStorageButtonClicked}
                />

                <CanvasComponent />

                <StageComponent
                    stage={this.props.stage}
                >
                    <LayersComponent
                        stage={this.props.stage}
                        layers={this.props.layers}
                        displayVertices={this.props.displayVertices}
                        displayLabels={this.props.displayLabels}
                        widthOn={this.props.widthOn}
                        zoomFactor={this.props.zoomFactor}
                        hoveredShape={this.props.measureShapesTool.hoveredShape}
                        firstMeasuredShape={this.props.measureShapesTool.firstMeasuredShape}
                        secondMeasuredShape={this.props.measureShapesTool.secondMeasuredShape}
                        onMouseOver={this.props.handleMouseRollOverShape}
                        onMouseOut={this.props.handleMouseRollOutShape}
                        onClick={this.props.handleClickOnShape}
                    />
                    {displayCoordsTool}
                    {measurePointsTool}
                    {measureShapesTool}
                </StageComponent>

                <StatusComponent />

                <ModalPopup
                    showPopup={this.props.showAboutPopup}
                    closePopup={this.props.toggleAboutPopup}
                >
                    <AboutPopup
                        title={this.props.title}
                        version={this.props.version}
                        build={this.props.build}
                        // onCloseAboutPopupPressed={this.closeAboutPopup}
                    />
                </ModalPopup>

            </main>
        )
    }
}

const mapStateToProps = state => {
    return {
        stage: state.app.stage,
        title: state.app.title,
        version: state.app.version,
        build: state.app.build,
        displayVertices: state.app.displayVertices,
        displayLabels: state.app.displayLabels,
        widthOn: state.app.widthOn,
        zoomFactor: state.app.zoomFactor,
        units: state.app.units,
        showSkeletonRecognitionButton: state.app.showSkeletonRecognitionButton,
        divisor: state.app.divisor,
        decimals: state.app.decimals,
        measurePointsActive: state.app.measurePointsActive,
        showAboutPopup: state.app.showAboutPopup,
        layers: state.layers,
        mouse: state.mouse,
        measureShapesTool: state.measureShapesTool,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resizeStage: () => dispatch(actions.resizeStage()),
        handleFileSelect: (files, stage, layers) => dispatch(actions.handleFileSelect(files, stage, layers)),
        setHomeView: (stage, shape) => dispatch(actions.setHomeView(stage, shape)),
        toggleUnits: () => dispatch(actions.toggleUnits()),
        toggleWidthMode: () => dispatch(actions.toggleWidthMode()),
        toggleDisplayVertices: () => dispatch(actions.toggleDisplayVertices()),
        toggleDisplayLabels: () => dispatch(actions.toggleDisplayLabels()),
        toggleAboutPopup: () => dispatch(actions.toggleAboutPopup()),
        toggleMeasureBetweenPoints: () => dispatch(actions.toggleMeasureBetweenPoints()),
        toggleMeasureBetweenShapes: () => dispatch(actions.toggleMeasureBetweenShapes()),
        togglePanByDrag: () => dispatch(actions.togglePanByDrag()),
        applySkeletonRecognition: () => dispatch(actions.applySkeletonRecognition()),
        handleMouseRollOverShape: (shape) => dispatch(actions.handleMouseRollOverShape(shape)),
        handleMouseRollOutShape: () => dispatch(actions.handleMouseRollOutShape()),
        handleClickOnShape: (shape, layer) => dispatch(actions.handleClickOnShape(shape, layer)),
        onSaveDocumentButtonClicked: () => dispatch(actions.saveDocumentOnCloud()),
        onManageCloudStorageButtonClicked: () => dispatch(actions.openDocumentOnCloud()),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
