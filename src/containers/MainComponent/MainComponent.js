/**
 * Created by alexanderbol on 17/04/2017.
 */

import React, {Component} from 'react';
import ToolbarComponent from '../../components/MainComponent/ToolbarComponent/ToolbarComponent';
import CanvasComponent from '../../components/MainComponent/CanvasComponent/CanvasComponent';
import StatusComponent from '../../components/Layout/StatusComponent/StatusComponent';

import {StageComponent} from "../../components/MainComponent/GraphicsEditor/stageComponent";
import LayersComponent from '../../components/MainComponent/GraphicsEditor/layersComponent';

import * as ActionTypes from '../../store/action-types';
import {Layers} from '../../models/layers';
import {MeasurePointsTool} from '../../tools/measurePointsTool';
import {MeasureShapesTool} from "../../tools/measureShapesTool";
import {DisplayCoordsTool} from "../../tools/displayCoordsTool";

import ModalPopup from "../../components/UI/ModalPopup/ModalPopup";
import AboutPopup from "../../components/AboutPopup/AboutPopup";

import styles from './MainComponent.module.css';

class MainComponent extends Component {
    registerStage = (stage) => {
        this.dispatch({
            type: ActionTypes.NEW_STAGE_CREATED,
            stage: stage,
        });
    };

    resizeStage = () => {
        // alert("resized")
        this.dispatch({
            type: ActionTypes.STAGE_RESIZED,
            stage: this.state.app.stage
        });
    };

    toggleUnits = () => {
        this.dispatch({
            type: ActionTypes.TOGGLE_UNITS_CLICKED
        });
    };

    handleMouseMove = (stageX, stageY) => {
        this.dispatch({
            type: ActionTypes.MOUSE_MOVED_ON_STAGE,
            stage: this.state.app.stage,
            x: stageX,
            y: stageY,
            dx: this.state.mouse.startX ? stageX - this.state.mouse.startX : undefined,
            dy: this.state.mouse.startY ? stageY - this.state.mouse.startY : undefined
        });
    };

    handleMouseDown = (stageX, stageY) => {
        // start pan stage
        this.dispatch({
            type: ActionTypes.MOUSE_DOWN_ON_STAGE,
            stage: this.state.app.stage,
            x: stageX,
            y: stageY
        })
    };

    handleMouseUp = (stageX, stageY) => {
        // stop pan stage
        // Patch bug in Firefox when dispatch is not fired
        this.state.app.stage.panByMouseStop();
        this.dispatch({
            type: ActionTypes.MOUSE_UP_ON_STAGE,
            state: this.state.app.stage,
            x: stageX,
            y: stageY
        })
    };

    handleMouseWheelMove = (stageX, stageY, delta) => {
        if (delta !== 0) {
            this.dispatch({
                type: ActionTypes.MOUSE_WHEEL_MOVE_ON_STAGE,
                stage: this.state.app.stage,
                x: stageX,
                y: stageY,
                delta: delta
            });
        }
    };

    onMouseRollOverShape = (shape) => {
        this.dispatch({
            type: ActionTypes.MOUSE_ROLL_OVER_SHAPE,
            shape: shape
        })
    };

    onMouseRollOutShape = () => {
        this.dispatch({
            type: ActionTypes.MOUSE_ROLL_OUT_SHAPE,
        })
    };

    onClickOnShape = (shape, layer) => {
        this.dispatch({
            type: ActionTypes.MOUSE_CLICKED_ON_SHAPE,
            shape: shape,
            layer: layer
        })
    };

    handleFileSelect = (event) => {
        if (!(File && FileReader && FileList)) return;

        let files = event.target.files; // FileList object

        this.dispatch({
            type: ActionTypes.FILENAME_LIST_SELECTED,
            files: files,
            stage: this.state.app.stage,
            layers: this.state.layers
        });
    };

    setHomeView = () => {
        let layer = Layers.getAffected(this.state.layers);
        if (!layer) return;
        // TODO: dispatch PAN_AND_ZOOM instead ?
        this.dispatch({
            type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
            stage: this.state.app.stage,
            shape: layer
        })
    };

    onPanByDragPressed = () => {
        this.dispatch({
            type: ActionTypes.PAN_BY_DRAG_BUTTON_CLICKED
        })
    };

    toggleWidthMode = () => {
        this.dispatch({
            type: ActionTypes.TOGGLE_WIDTH_MODE_CLICKED,
            widthOn: this.state.app.widthOn
        })

    };

    toggleDisplayVertices = () => {
        this.dispatch({
            type: ActionTypes.TOGGLE_DISPLAY_VERTICES_CLICKED
        })
    };

    toggleDisplayLabels = () => {
        this.dispatch({
            type: ActionTypes.TOGGLE_DISPLAY_LABELS_CLICKED
        })
    };

    showAboutPopup = () => {
        this.dispatch({
            type: ActionTypes.SHOW_ABOUT_POPUP_BUTTON_PRESSED
        })
    };

    closeAboutPopup = () => {
        this.dispatch({
            type: ActionTypes.CLOSE_ABOUT_POPUP_BUTTON_PRESSED
        })
    };

    onMeasurePointsButtonPressed = () => {
        this.dispatch({
            type: ActionTypes.MEASURE_POINTS_BUTTON_PRESSED
        });
    };

    onMeasureBetweenShapesButtonPressed = () => {
        this.dispatch({
            type: ActionTypes.MEASURE_SHAPES_BUTTON_PRESSED
        });
    };

    aabbToolNext = () => {
        this.dispatch({
            type: ActionTypes.AABB_TREE_NEXT_LEVEL
        })
    };

    nextAabbDistStep = () => {
        this.dispatch({
            type: ActionTypes.AABB_DEMO_NEXT_DIST_STEP
        })
    };

    onCollisionDemoButtonPressed = () => {
        this.dispatch({
            type: ActionTypes.COLLISION_DEMO_BUTTON_PRESSED
        })
    };

    onSkeletonRecognitionButtonPressed = () => {
        this.dispatch({
            type: ActionTypes.SKELETON_RECOGNITION_BUTTON_PRESSED
        })
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
                this.toggleWidthMode();     // toggle width On/Off in graphics model
                break;

            case "KeyE":
                this.toggleDisplayVertices();  // toggle vertices On/Off
                break;

            case "ArrowRight":
                this.nextAabbDistStep();
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

    // handleKeyUp = (event) => ()

    componentWillMount() {
        this.dispatch = this.props.store.dispatch;
        this.setState(this.props.store.getState());
    }

    componentDidMount() {
        window.onresize = this.resizeStage;
        // Keyboard event
        // var _keydown = _.throttle(this.keydown, 100);
        document.addEventListener('keydown', this.handleKeyDown);
        // var _keyup = _.throttle(this.keyup, 500);
        document.addEventListener('keyup', this.handleKeyUp);
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.store.getState());
    }

    render() {
        let displayCoordsTool = this.state.app.stage ? (
            <DisplayCoordsTool
                key="displayCoordinatedTool"
                stage={this.state.app.stage}
                units={this.state.app.units}
                divisor={this.state.app.divisor}
                decimals={this.state.app.decimals}
                coordX={this.state.mouse.x}
                coordY={this.state.mouse.y}
            />
        ) : null;

        let measurePointsTool =
            this.state.app.measurePointsActive ? (
                <MeasurePointsTool
                    stage={this.state.app.stage}
                    divisor={this.state.app.divisor}
                    decimals={this.state.app.decimals}
                    onMouseWheelMove={this.handleMouseWheelMove}
                />
            ) : null;

        let measuredLayersDisplayed = this.state.measureShapesTool.firstMeasuredShape &&
            this.state.measureShapesTool.secondMeasuredShape &&
            this.state.measureShapesTool.firstMeasuredLayer.displayed &&
            this.state.measureShapesTool.secondMeasuredLayer.displayed;

        let measureShapesTool = this.state.measureShapesTool.distance &&
        this.state.measureShapesTool.shortestSegment && measuredLayersDisplayed ? (
            <MeasureShapesTool
                key="MeasureShapesTool"
                stage={this.state.app.stage}
                firstMeasuredShape={this.state.measureShapesTool.firstMeasuredShape}
                secondMeasuredShape={this.state.measureShapesTool.secondMeasuredShape}
                firstMeasuredLayer={this.state.measureShapesTool.firstMeasuredLayer}
                secondMeasuredLayer={this.state.measureShapesTool.secondMeasuredLayer}
                distance={this.state.measureShapesTool.distance}
                shortestSegment={this.state.measureShapesTool.shortestSegment}
                divisor={this.state.app.divisor}
                decimals={this.state.app.decimals}
            />
        ) : null;

        return (
            <main className={styles["Main-content"]}>
                <ToolbarComponent
                    units={this.state.app.units}
                    showSkeletonRecognitionButton={this.state.app.showSkeletonRecognitionButton}
                    onFileSelected={this.handleFileSelect}
                    onHomeButtonPressed={this.setHomeView}
                    onPanByDragPressed={this.onPanByDragPressed}
                    onMeasurePointsButtonPressed={this.onMeasurePointsButtonPressed}
                    onMeasureBetweenShapesButtonPressed={this.onMeasureBetweenShapesButtonPressed}
                    onToggleWidthModePressed={this.toggleWidthMode}
                    onToggleVerticesPressed={this.toggleDisplayVertices}
                    onToggleLabelsPressed={this.toggleDisplayLabels}
                    onShowAboutPopupPressed={this.showAboutPopup}
                    onSkeletonRecognitionButtonPressed={this.onSkeletonRecognitionButtonPressed}
                    onUnitClicked={this.toggleUnits}
                />

                <CanvasComponent
                    stage={this.state.app.stage}
                    onStageCreated={this.registerStage}
                    onMouseDown={this.handleMouseDown}
                    onMouseMove={this.handleMouseMove}
                    onMouseUp={this.handleMouseUp}
                    onMouseWheelMove={this.handleMouseWheelMove}
                />

                <StageComponent
                    stage={this.state.app.stage}
                >
                    <LayersComponent
                        stage={this.state.app.stage}
                        layers={this.state.layers}
                        displayVertices={this.state.app.displayVertices}
                        displayLabels={this.state.app.displayLabels}
                        widthOn={this.state.app.widthOn}
                        zoomFactor={this.state.app.zoomFactor}
                        hoveredShape={this.state.measureShapesTool.hoveredShape}
                        firstMeasuredShape={this.state.measureShapesTool.firstMeasuredShape}
                        secondMeasuredShape={this.state.measureShapesTool.secondMeasuredShape}
                        onMouseOver={this.onMouseRollOverShape}
                        onMouseOut={this.onMouseRollOutShape}
                        onClick={this.onClickOnShape}
                    />
                    {displayCoordsTool}
                    {measurePointsTool}
                    {measureShapesTool}
                </StageComponent>

                <StatusComponent />

                <ModalPopup
                    showPopup={this.state.app.showAboutPopup}
                    closePopup={this.closeAboutPopup}
                >
                    <AboutPopup
                        title={this.state.app.title}
                        version={this.state.app.version}
                        build={this.state.app.build}
                        // onCloseAboutPopupPressed={this.closeAboutPopup}
                    />
                </ModalPopup>

            </main>
        )
    }
}

export default MainComponent;
