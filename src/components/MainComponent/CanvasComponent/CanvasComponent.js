/**
 * Created by alexanderbol on 21/04/2017.
 */

import React, {Component} from 'react';
import styles from "./CanvasComponent.module.css";
import Stage from '../../../models/stage';

class CanvasComponent extends Component {
    canvasElement = React.createRef();

    handleMouseMove = (event) => {
        this.props.stage.canvas.focus();
        this.props.onMouseMove(event.stageX, event.stageY);
    };

    handleMouseDown = (event) => {
        this.props.onMouseDown(event.stageX, event.stageY);
    };

    handleMouseUp = (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.props.onMouseUp(event.stageX, event.stageY);
    };

    handleMouseLeave = (event) => {   // nothing works except click
        this.props.stage.canvas.blur();
        document.body.focus();
    };

    handleMouseWheel = (event) => {
        event.preventDefault();

        let delta = event.detail || event.wheelDelta;
        if (delta !== 0) {
            this.props.onMouseWheelMove(event.offsetX, event.offsetY, delta);
        }
    };

    handleMouseWheelFox = (event) => {
        event.preventDefault();
        if (event.detail !== 0) {
            this.props.onMouseWheelMove(event.layerX, event.layerY, -event.detail);
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
        stage.canvas.addEventListener("mousewheel", this.handleMouseWheel);
        stage.canvas.addEventListener("DOMMouseScroll", this.handleMouseWheelFox);

        this.props.onStageCreated(stage);
    }

    render() {
        return (
            <canvas tabIndex="1" ref={this.canvasElement} id="mainCanvas" className={styles["App-canvas"]}>
            </canvas>
        )
    }
}

export default CanvasComponent;