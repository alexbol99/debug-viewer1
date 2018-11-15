/**
 * Created by alexanderbol on 21/04/2017.
 */

import React, {Component} from 'react';
import styles from "./CanvasComponent.module.css";
import Stage from '../../../models/stage';
import { connect } from "react-redux";
// import * as ActionTypes from "../../../store/actionTypes";
import * as actions from '../../../store/actions/stageActions';

class CanvasComponent extends Component {
    canvasElement = React.createRef();

    handleMouseMove = (event) => {
        this.props.stage.canvas.focus();
        this.props.handleMouseMove(
            this.props.stage,
            event.stageX,
            event.stageY,
            this.props.mouse.startX ? event.stageX - this.props.mouse.startX : undefined,
            this.props.mouse.startY ? event.stageY - this.props.mouse.startY : undefined
        );
    };

    handleMouseDown = (event) => {
        this.props.handleMouseDown(this.props.stage, event.stageX, event.stageY);
    };

    handleMouseUp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.stage.panByMouseStop();
        this.props.handleMouseUp(this.props.stage, event.stageX, event.stageY);
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

    componentDidMount() {
        let stage = new Stage(this.canvasElement.current);

        // stage.setClearColor("#FFFFFF");
        // stage.update();

        stage.on("stagemousemove", this.handleMouseMove);
        stage.on("stagemousedown", this.handleMouseDown);
        stage.on("stagemouseup", this.handleMouseUp);
        stage.on("mouseleave", this.handleMouseLeave);
        stage.canvas.addEventListener("mousewheel", this.handleMouseWheel, {passive: true});
        stage.canvas.addEventListener("DOMMouseScroll", this.handleMouseWheelFox, {passive: true});

        this.props.registerStage(stage);
    }

    render() {
        return (
            <canvas tabIndex="1" ref={this.canvasElement} id="mainCanvas" className={styles["App-canvas"]}>
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
        handleMouseWheelMove: (stage, x, y, delta) => dispatch(actions.handleMouseWheelMove(stage, x, y, delta))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);
