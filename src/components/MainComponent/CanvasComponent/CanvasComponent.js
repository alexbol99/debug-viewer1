/**
 * Created by alexanderbol on 21/04/2017.
 */

import {Component, createRef} from 'react';
import styles from "./CanvasComponent.module.css";
import Stage from '../../../models/stage';
import { connect } from "react-redux";
import * as actions from '../../../store/actions/stageActions';

class CanvasComponent extends Component {
    canvasElement = createRef();

    handleMouseMove = (event) => {
        this.props.stage.canvas.focus();
        if (!event.nativeEvent.touches || event.nativeEvent.touches.length === 1) {
            this.props.handleMouseMove(
                this.props.stage,
                event.stageX,
                event.stageY,
                this.props.mouse.startX ? event.stageX - this.props.mouse.startX : undefined,
                this.props.mouse.startY ? event.stageY - this.props.mouse.startY : undefined
            );
        }
        else if (event.nativeEvent.touches && event.nativeEvent.touches.length === 2) {
            let touchPoints = [
                {
                    x: event.nativeEvent.touches[0].clientX - event.nativeEvent.target.offsetLeft,
                    y: event.nativeEvent.touches[0].clientY - event.nativeEvent.target.offsetTop
                },
                {
                    x: event.nativeEvent.touches[1].clientX - event.nativeEvent.target.offsetLeft,
                    y: event.nativeEvent.touches[1].clientY - event.nativeEvent.target.offsetTop
                },
            ];
            this.props.handlePinchMove(this.props.stage, touchPoints);
        }

        // if (this.props.stage.pinchStarted) {
        //     this.props.handleSecondTouchMove(this.props.stage, event.stageX, event.stageY);
        // }
        // else {
        //     this.props.handleMouseMove(
        //         this.props.stage,
        //         event.stageX,
        //         event.stageY,
        //         this.props.mouse.startX ? event.stageX - this.props.mouse.startX : undefined,
        //         this.props.mouse.startY ? event.stageY - this.props.mouse.startY : undefined
        //     );
        // }
    };

    handleMouseDown = (event) => {
        // if (event.pointerID === -1 || event.pointerID === 0) {
        if (!event.nativeEvent.touches || event.nativeEvent.touches.length === 1) {
            this.props.handleMouseDown(this.props.stage, event.stageX, event.stageY);
        }
        else if (event.nativeEvent.touches && event.nativeEvent.touches.length === 2) {
            let touchPoints = [
                {
                    x: event.nativeEvent.touches[0].clientX - event.nativeEvent.target.offsetLeft,
                    y: event.nativeEvent.touches[0].clientY - event.nativeEvent.target.offsetTop
                },
                {
                    x: event.nativeEvent.touches[1].clientX - event.nativeEvent.target.offsetLeft,
                    y: event.nativeEvent.touches[1].clientY - event.nativeEvent.target.offsetTop
                },
            ];
            this.props.handlePinchDown(this.props.stage, touchPoints);
        }
    };

    handleMouseUp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        if (!event.nativeEvent.touches || event.nativeEvent.touches.length === 1) {
            this.props.handleMouseUp(this.props.stage);
        }
        else if (event.nativeEvent.touches && event.nativeEvent.touches.length === 2) {
            this.props.handlePinchUp(this.props.stage);
        }
    };

    handleMouseLeave = (event) => {   // nothing works except click
        this.props.stage.canvas.blur();
        document.body.focus();
    };

    handleMouseWheel = (event) => {
        /*event.preventDefault();*/

        let delta = event.detail || event.wheelDelta;
        if (delta !== 0) {
            this.props.handleMouseWheelMove(this.props.stage, event.offsetX, event.offsetY, delta);
        }
    };

    handleMouseWheelFox = (event) => {
        /*event.preventDefault();*/
        if (event.detail !== 0) {
            this.props.handleMouseWheelMove(this.props.stage, event.layerX, event.layerY, -event.detail);
        }
    };

    // handlePaste = (event) => {
    //     let a = event;
    // }

    componentDidMount() {
        let stage = new Stage(this.canvasElement.current);

        stage.on("stagemousedown", this.handleMouseDown);
        stage.on("stagemousemove", this.handleMouseMove);
        stage.on("stagemouseup", this.handleMouseUp);
        stage.on("mouseleave", this.handleMouseLeave);
        stage.canvas.addEventListener("mousewheel", this.handleMouseWheel, {passive: true});
        stage.canvas.addEventListener("DOMMouseScroll", this.handleMouseWheelFox, {passive: true});
        // stage.canvas.addEventListener("paste", this.handlePaste);

        this.props.registerStage(stage);
    }

    render() {
        return (
            <canvas
                tabIndex="1"
                ref={this.canvasElement}
                id="mainCanvas"
                className={styles["App-canvas"]}
                width="100"
                height="100"
            >
            </canvas>
        )
    }
}

const mapStateToProps = state => {
    return {
        stage: state.app.stage,
        mouse: state.mouse
    }
};

const mapDispatchToProps = dispatch => {
    return {
        registerStage: (stage) => dispatch(actions.registerStage(stage)),
        handleMouseDown: (stage, x, y) => dispatch(actions.handleMouseDown(stage, x, y)),
        handleMouseUp: (stage, x, y) => dispatch(actions.handleMouseUp(stage, x, y)),
        handleMouseMove: (stage, x, y, dx, dy) => dispatch(actions.handleMouseMove(stage, x, y, dx, dy)),
        handleMouseWheelMove: (stage, x, y, delta) => dispatch(actions.handleMouseWheelMove(stage, x, y, delta)),
        handlePinchDown: (stage, touchPoints) => dispatch(actions.handlePinchDown(stage, touchPoints)),
        handlePinchMove: (stage, touchPoints) => dispatch(actions.handlePinchMove(stage, touchPoints)),
        handlePinchUp: (stage) => dispatch(actions.handlePinchUp(stage))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);
