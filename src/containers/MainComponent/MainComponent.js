/**
 * Created by alexanderbol on 17/04/2017.
 */

import {Component} from 'react';
import {Route} from 'react-router-dom';
import { connect } from "react-redux";

import ToolbarComponent from '../../components/MainComponent/ToolbarComponent/ToolbarComponent';
import CanvasComponent from '../../components/MainComponent/CanvasComponent/CanvasComponent';
import StatusComponent from '../../components/Layout/StatusComponent/StatusComponent';

import StageComponent from "../../components/MainComponent/GraphicsComponent/stageComponent";
import LayersComponent from '../../components/MainComponent/GraphicsComponent/layersComponent';

import * as actions from '../../store/actions/appActions';
import * as layerActions from "../../store/actions/layersActions";
import * as cloudActions from '../../store/actions/cloudStorageActions';

import Layers from '../../models/layers';
import MeasurePointsTool from '../../tools/measurePointsTool';
import MeasureShapesTool from "../../tools/measureShapesTool";
import DisplayCoordsTool from "../../tools/displayCoordsTool";

import AboutPopup from "../../components/AboutPopup/AboutPopup";
import DownloadPopup from "../../components/DownloadPopup/DownloadPopup";
import UploadPopup from '../../components/UploadPopup/UploadPopup';
import CloudDocument from '../../components/Constructions/CloudDocument';

import styles from './MainComponent.module.css';

class MainComponent extends Component {
    setHomeView = () => {
        let layer = Layers.getAffected(this.props.layers);
        if (!layer) return;
        this.props.setHomeView(this.props.stage, layer);
        this.forceUpdate();       // ??? unclear why on Home button click not updated
    };

    onSaveDocumentButtonClicked = () => {
        if (this.props.layers.length === 0) return;   // nothing to save
        // this.props.stage.img.crossOrigin="anonymous";
        let dataURL = null;
        try {
            dataURL = this.props.stage.toDataURL();
        }
        catch(e) {
            console.log(e)
        }
        let payload = {
            name: this.props.document.name === "" ?
                cloudActions.getNewName(this.props.documentsList) : this.props.document.name,
            dataURL: dataURL,
            lastUpdated: new Date().toLocaleDateString() + " " + new Date().toLocaleTimeString(),
            // token: this.props.token,
            userId: this.props.userId
        };

        if (this.props.document.id) {
            this.props.updateDocumentInDatabase(this.props.document.id, payload, this.props.layers);
        }
        else {
            this.props.addDocumentToDatabase(payload, this.props.layers, this.props.history);
        }
    };

    clearCurrentDocument = () => {
        this.props.clearCurrentDocument();
        this.props.clearAllLayers();
        this.props.history.push("/");
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

        // if (this.props.document.id === undefined) {
        //     this.props.history.push("/");
        // }
        // if (this.props.document.id !== undefined) {
        //     this.props.history.push("/documents/" + this.props.document.id)
        // }
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
                    // onFileSelected={this.handleFileSelect}
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
                    onSaveDocumentButtonClicked={this.onSaveDocumentButtonClicked}
                    onClearAllButtonClicked={this.clearCurrentDocument}
                    onLayerListButtonClicked={this.props.toggleLayerList}
                    onShowDownloadPopupPressed={this.props.toggleDownloadPopup}
                    onShowUploadPopupPressed={this.props.toggleUploadPopup}
                />

                <CanvasComponent />

                {this.props.stage ? (
                    <StageComponent
                        stage={this.props.stage}
                        onStageUnmounted={this.props.destroyStage}
                    >
                        <LayersComponent layers={this.props.layers}/>

                        {displayCoordsTool}
                        {measurePointsTool}
                        {measureShapesTool}
                    </StageComponent>) : null }

                <StatusComponent />

                { this.props.showAboutPopup ?
                    <AboutPopup
                        showAboutPopup={this.props.showAboutPopup}
                        toggleAboutPopup={this.props.toggleAboutPopup}
                        title={this.props.title}
                        version={this.props.version}
                        build={this.props.build}
                    /> : null}


                { this.props.showDownloadPopup ?
                    <DownloadPopup
                        showPopup={this.props.showDownloadPopup}
                        closePopup={this.props.toggleDownloadPopup}
                        title="Download document"
                        layers={this.props.layers}
                    /> : null }

                {this.props.showUploadPopup ?
                    <UploadPopup
                        showPopup={this.props.showUploadPopup}
                        closePopup={this.props.toggleUploadPopup}
                        title="Upload files"
                        onPaste={this.props.pasteDataFromBuffer}
                    /> : null}

                <Route path="/documents/:id" component={CloudDocument}/>

            </main>
        )
    }
}

const mapStateToProps = (state, ownProps) => {
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
        showDownloadPopup: state.app.showDownloadPopup,
        showUploadPopup: state.app.showUploadPopup,
        layers: state.layers,
        mouse: state.mouse,
        measureShapesTool: state.measureShapesTool,

        document: state.cloudStorage.document,
        documentsList: state.cloudStorage.documentsList,
        // onManageCloudStorageButtonClicked: ownProps.onManageCloudStorageButtonClicked
        token: state.auth.token,
        userId: state.auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        resizeStage: () => dispatch(actions.resizeStage()),
        destroyStage: () => dispatch(actions.destroyStage()),
        setHomeView: (stage, shape) => dispatch(actions.setHomeView(stage, shape)),
        toggleUnits: () => dispatch(actions.toggleUnits()),
        toggleWidthMode: () => dispatch(actions.toggleWidthMode()),
        toggleDisplayVertices: () => dispatch(actions.toggleDisplayVertices()),
        toggleDisplayLabels: () => dispatch(actions.toggleDisplayLabels()),
        toggleAboutPopup: () => dispatch(actions.toggleAboutPopup()),
        toggleMeasureBetweenPoints: () => dispatch(actions.toggleMeasureBetweenPoints()),
        toggleMeasureBetweenShapes: () => dispatch(actions.toggleMeasureBetweenShapes()),
        togglePanByDrag: () => dispatch(actions.togglePanByDrag()),
        toggleLayerList: () => dispatch(actions.toggleLayerList()),
        toggleDownloadPopup: () => dispatch(actions.toggleDownloadPopup()),
        toggleUploadPopup: () => dispatch(actions.toggleUploadPopup()),
        applySkeletonRecognition: () => dispatch(actions.applySkeletonRecognition()),
        pasteDataFromBuffer: (clipboardData) => dispatch(actions.pasteDataFromBuffer(clipboardData)),

        clearAllLayers: () => dispatch(layerActions.deleteAllLayers()),

        addDocumentToDatabase: (payload, layers, history) => dispatch(cloudActions.addDocumentToDatabase(payload, layers, history)),
        updateDocumentInDatabase: (id, payload, layers) => dispatch(cloudActions.updateDocumentInDatabase(id, payload, layers)),
        clearCurrentDocument: () => dispatch(cloudActions.clearCurrentDocument())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainComponent);
