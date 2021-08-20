/**
 * Created by alexanderbol on 21/04/2017.
 */

import {Component, createRef} from 'react';
import {connect} from "react-redux";
import Stage from "../models/stage";
import * as actions from '../store/actions/stageActions';

class MeasurePointsTool extends Component {
    measureCanvas = createRef();
    measureStage = null;

    state = {
        startX: undefined,
        startY: undefined,
        endX: undefined,
        endY: undefined,
        measureStarted: false
    };

    handleMouseDown = (event) => {
        event.preventDefault();

        this.measureStage.clear();

        if (this.state.measureStarted) {   // second click - clear measurement
            this.setState({
                startX: undefined,
                startY: undefined,
                endX: undefined,
                endY: undefined,
                measureStarted: false
            });
            this.measureStage.canvas.style.cursor = "auto";
        }
        else {                       // first click - start measurment
            this.setState({
                startX: this.measureStage.C2W_X(event.stageX),
                startY: this.measureStage.C2W_Y(event.stageY),
                measureStarted: true
            });
            this.measureStage.canvas.style.cursor = "crosshair";
        }
    };

    handleMouseMove = (event) => {
        if (this.state.measureStarted) {
            this.setState({
                endX: this.measureStage.C2W_X(event.stageX),
                endY: this.measureStage.C2W_Y(event.stageY)
            })
        }
    };

    handleMouseUp = (event) => {
    }

    handleMouseWheel = (event) => {
        event.preventDefault();

        let delta = event.detail || event.wheelDelta;
        if (delta !== 0) {
            // this.props.onMouseWheelMove(event.offsetX, event.offsetY, delta);
            this.props.handleMouseWheelMove(this.props.stage, event.offsetX, event.offsetY, delta);

            this.draw();
        }
    };

    handleMouseWheelFox = (event) => {
        event.preventDefault();

        if (event.detail !== 0) {
            // this.props.onMousewheelMove(event.layerX, event.layerY, -event.detail);
            this.props.handleMouseWheelMove(this.props.stage, event.layerX, event.layerY, -event.detail);

            this.draw();
        }
    };

    draw() {
        // let canvas = this.measureCanvas.current;
        let stage = this.measureStage; // this.props.stage;
        let canvas = stage.canvas;
        let context = canvas.getContext('2d');

        this.measureStage.origin = this.props.stage.origin;
        this.measureStage.resolution = this.props.stage.resolution;
        this.measureStage.zoomFactor = this.props.stage.zoomFactor;

        this.measureStage.clear();

        // Draw rectangle
        let pllX = Math.min(stage.W2C_X(this.state.startX), stage.W2C_X(this.state.endX));
        let pllY = Math.min(stage.W2C_Y(this.state.startY), stage.W2C_Y(this.state.endY));
        let width = Math.abs(stage.W2C_Scalar(this.state.startX - this.state.endX));
        let height = Math.abs(stage.W2C_Scalar(this.state.startY - this.state.endY));

        context.beginPath();
        context.rect(pllX, pllY, width, height);

        // Draw segment
        context.moveTo(stage.W2C_X(this.state.startX), stage.W2C_Y(this.state.startY));
        context.lineTo(stage.W2C_X(this.state.endX), stage.W2C_Y(this.state.endY));

        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();

        // Draw text
        let textX, textY, textHeight, textWidth;
        let backX, backY;                      // background rectangle
        let text = this.measurement();

        context.font = "12pt Arial";

        textHeight = 12;
        /* font size*/
        textWidth = context.measureText(text).width;

        // Rectangle to the right of current point, text aligned left
        if (Math.abs(stage.W2C_X(this.state.endX) - pllX) <= 2) {
            context.textAlign = "left";
            textX = pllX + 3;
            backX = pllX;
        }
        // Rectangle to the left of current point, text aligned right
        else {
            context.textAlign = "right";
            textX = pllX + width - 3;
            backX = textX - textWidth - 3;
        }

        if (Math.abs(stage.W2C_Y(this.state.endY) - pllY) <= 2) {
            textY = pllY - 3;
        }
        else {
            textY = pllY + height + textHeight + 3;
        }
        backY = textY - textHeight - 3;

        context.fillStyle = 'white';
        context.globalAlpha = 0.4;
        context.fillRect(backX, backY, textWidth + 6, textHeight + 6);

        context.fillStyle = "black";
        context.globalAlpha = 1;
        context.fillText(this.measurement(), textX, textY);
    }

    measurement() {
        let dx = this.state.endX - this.state.startX;
        let dy = this.state.endY - this.state.startY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let message = "DX=" + this.format(dx) + ",DY=" + this.format(dy) + ",D=" + this.format(dist);
        return message;
    }

    format(num) {
        return (num / this.props.divisor).toFixed(this.props.decimals);
    }

    componentDidMount() {
        // let canvas = this.measureCanvas.current;
        this.measureStage = new Stage(this.measureCanvas.current);
        this.measureStage.origin = this.props.stage.origin;
        this.measureStage.resolution = this.props.stage.resolution;
        this.measureStage.zoomFactor = this.props.stage.zoomFactor;

        this.measureStage.on("stagemousedown", this.handleMouseDown);
        this.measureStage.on("stagemousemove", this.handleMouseMove);
        this.measureStage.on("stagemouseup", this.handleMouseUp);

        this.measureStage.canvas.addEventListener("mousewheel", this.handleMouseWheel);
        this.measureStage.canvas.addEventListener("DOMMouseScroll", this.handleMouseWheelFox);
    }

    componentDidUpdate() {
        if (this.state.measureStarted) {
            this.draw();
        }
    }

    componentWillUnmount() {
        this.measureStage.clear();
        this.measureStage.removeAllChildren();
        this.measureStage.removeAllEventListeners();
    }

    render() {
        let mainCanvas = this.props.stage.canvas;
        let width = mainCanvas.width;
        let height = mainCanvas.height;
        let top = mainCanvas.offsetTop;
        let left = mainCanvas.offsetLeft;
        return (
            <canvas tabIndex="1" ref={this.measureCanvas}
                    width={width}
                    height={height}
                    style={{position: 'absolute', top: top, left: left}}
            >
            </canvas>
        )
    }
}

const mapStateToProps = ({app}) => {
    return {
        stage: app.stage,
        divisor: app.divisor,
        decimals: app.decimals
    }
};

const mapDispatchToProps = dispatch => {
    return {
        handleMouseWheelMove: (stage, x, y, delta) => dispatch(actions.handleMouseWheelMove(stage, x, y, delta))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(MeasurePointsTool);
