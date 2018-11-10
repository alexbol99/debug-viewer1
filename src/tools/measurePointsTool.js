/**
 * Created by alexanderbol on 21/04/2017.
 */

import React, {Component} from 'react';
import { connect } from "react-redux";
// import * as ActionTypes from "../../../store/actionTypes";
import * as actions from '../store/actions/stageActions';

class MeasurePointsTool extends Component {
    startX = undefined;
    startY = undefined;
    endX = undefined;
    endY = undefined;
    measureStarted = false;

    measureCanvas = React.createRef();

    handleMouseDown = (event) => {
        event.preventDefault();

        let canvas = this.measureCanvas.current;
        let stage = this.props.stage;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        let coordX = event.offsetX || event.originalEvent.layerX;    // layerX for Firefox
        let coordY = event.offsetY || event.originalEvent.layerY;    // layery for Firefox

        if (this.measureStarted) {   // second click - clear measurement
            this.startX = undefined;
            this.startY = undefined;
            this.endX = undefined;
            this.endY = undefined;
            this.measureStarted = false;
            canvas.style.cursor = "auto";
        }
        else {                       // first click - start measurment
            this.startX = stage.C2W_X(coordX);
            this.startY = stage.C2W_Y(coordY);
            this.measureStarted = true;
            canvas.style.cursor = "crosshair";
        }
    };


    handleMouseMove = (event) => {
        let stage = this.props.stage;

        let coordX = event.offsetX /*|| event.originalEvent ? event.originalEvent.layerX : undefined*/;    // layerX for Firefox
        let coordY = event.offsetY /*|| event.originalEvent ? event.originalEvent.layerY : undefined*/;    // layerY for Firefox

        if (this.measureStarted) {
            this.endX = stage.C2W_X(coordX);
            this.endY = stage.C2W_Y(coordY);

            this.draw();
        }
    };

    handleMouseUp = (event) => {}

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
        let canvas = this.measureCanvas.current;
        let context = canvas.getContext('2d');
        let stage = this.props.stage;

        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);

        // Draw rectangle
        let pllX = Math.min(stage.W2C_X(this.startX), stage.W2C_X(this.endX));
        let pllY = Math.min(stage.W2C_Y(this.startY), stage.W2C_Y(this.endY));
        let width = Math.abs(stage.W2C_Scalar(this.startX - this.endX));
        let height = Math.abs(stage.W2C_Scalar(this.startY - this.endY));

        context.beginPath();
        context.rect(pllX, pllY, width, height);

        // Draw segment
        context.moveTo(stage.W2C_X(this.startX), stage.W2C_Y(this.startY));
        context.lineTo(stage.W2C_X(this.endX), stage.W2C_Y(this.endY));

        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();

        // Draw text
        let textX, textY, textHeight, textWidth;
        let backX, backY;                      // background rectangle
        let text = this.measurement();

        context.font = "12pt Arial";

        textHeight = 12;         /* font size*/
        textWidth = context.measureText(text).width;

        // Rectangle to the right of current point, text aligned left
        if (Math.abs(stage.W2C_X(this.endX) - pllX) <= 2) {
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

        if (Math.abs(stage.W2C_Y(this.endY) - pllY) <= 2) {
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
        let dx = this.endX - this.startX;
        let dy = this.endY - this.startY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let message = "DX=" + this.format(dx) + ",DY=" + this.format(dy) + ",D=" + this.format(dist);
        return message;
    }

    format(num) {
        return (num/this.props.divisor).toFixed(this.props.decimals);
    }

    componentWillMount() {
        // this.dispatch = this.props.store.dispatch;
        // this.setState(this.props.store.getState());
    }

    componentDidMount() {
        let canvas = this.measureCanvas.current;
        canvas.addEventListener("mousedown", this.handleMouseDown);
        canvas.addEventListener("mousemove", this.handleMouseMove);
        canvas.addEventListener("mouseup", this.handleMouseUp);

        canvas.addEventListener("mousewheel", this.handleMouseWheel);
        canvas.addEventListener("DOMMouseScroll", this.handleMouseWheelFox);
    }

    componentDidUpdate() {
        if (this.measureStarted) {
            this.draw();
        }
    }

    componentWillUnmount() {
        let canvas = this.measureCanvas.current;
        canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
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
                    style={{position:'absolute',top:top,left:left}}
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
