/**
 * Created by alexanderbol on 21/04/2017.
 */

import React, {useState, useEffect, useRef} from 'react';
import {connect} from "react-redux";
import Stage from "../models/stage";
import * as actions from '../store/actions/stageActions';

const MeasurePointsTool = (props) => {
    const measureCanvas = useRef(null);
    const measureStageRef = useRef(null);

    // const [{startX,startY,endX,endY,measureStarted}, setMeasureState] = useState(initialState);
    const [startX, setStartX] = useState(undefined);
    const [startY, setStartY] = useState(undefined);
    const [endX, setEndX] = useState(undefined);
    const [endY, setEndY] = useState(undefined);
    const [measureStarted, setMeasureStarted] = useState(false);

    let {stage, divisor, decimals} = props;

    const draw = () => {
        // let canvas = measureCanvas.current;
        let measureStage = measureStageRef.current;
        // let stage = measureStage; // props.stage;
        let canvas = measureStage.canvas;
        let context = canvas.getContext('2d');

        measureStage.origin = stage.origin;
        measureStage.resolution = stage.resolution;
        measureStage.zoomFactor = stage.zoomFactor;

        measureStage.clear();

        // Draw rectangle
        let pllX = Math.min(measureStage.W2C_X(startX), measureStage.W2C_X(endX));
        let pllY = Math.min(measureStage.W2C_Y(startY), measureStage.W2C_Y(endY));
        let width = Math.abs(measureStage.W2C_Scalar(startX - endX));
        let height = Math.abs(measureStage.W2C_Scalar(startY - endY));

        context.beginPath();
        context.rect(pllX, pllY, width, height);

        // Draw segment
        context.moveTo(measureStage.W2C_X(startX), measureStage.W2C_Y(startY));
        context.lineTo(measureStage.W2C_X(endX), measureStage.W2C_Y(endY));

        context.lineWidth = 1;
        context.strokeStyle = 'black';
        context.stroke();

        // Draw text
        let textX, textY, textHeight, textWidth;
        let backX, backY;                      // background rectangle
        let text = measurement();

        context.font = "12pt Arial";

        textHeight = 12;
        /* font size*/
        textWidth = context.measureText(text).width;

        // Rectangle to the right of current point, text aligned left
        if (Math.abs(stage.W2C_X(endX) - pllX) <= 2) {
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

        if (Math.abs(measureStage.W2C_Y(endY) - pllY) <= 2) {
            textY = pllY - 3;
        } else {
            textY = pllY + height + textHeight + 3;
        }
        backY = textY - textHeight - 3;

        context.fillStyle = 'white';
        context.globalAlpha = 0.4;
        context.fillRect(backX, backY, textWidth + 6, textHeight + 6);

        context.fillStyle = "black";
        context.globalAlpha = 1;
        context.fillText(measurement(), textX, textY);
    };

    const measurement = () => {
        let dx = endX - startX;
        let dy = endY - startY;
        let dist = Math.sqrt(dx * dx + dy * dy);
        let message = "DX=" + format(dx) + ",DY=" + format(dy) + ",D=" + format(dist);
        return message;
    };

    const format = (num) => {
        return (num / divisor).toFixed(decimals);
    };

    useEffect(() => {
        let measureStage;

        const handleMouseDown = (event) => {
            event.preventDefault();

            measureStage.clear();

            if (measureStarted) {   // second click - clear measurement
                setStartX(undefined);
                setStartY(undefined);
                setEndX(undefined);
                setEndY(undefined);
                setMeasureStarted(false);
                measureStage.canvas.style.cursor = "auto";
            } else {                       // first click - start measurment
                setStartX(measureStage.C2W_X(event.stageX));
                setStartY(measureStage.C2W_Y(event.stageY));
                setMeasureStarted(true);
                measureStage.canvas.style.cursor = "crosshair";
            }
        };

        const handleMouseMove = (event) => {
            // if (measureStarted) {
                setEndX(measureStage.C2W_X(event.stageX));
                setEndY(measureStage.C2W_Y(event.stageY));
            // }
        };

        const handleMouseWheel = (event) => {
            event.preventDefault();

            let delta = event.detail || event.wheelDelta;
            if (delta !== 0) {
                // props.onMouseWheelMove(event.offsetX, event.offsetY, delta);
                props.handleMouseWheelMove(stage, event.offsetX, event.offsetY, delta);

                // draw();
            }
        };

        const handleMouseWheelFox = (event) => {
            event.preventDefault();

            if (event.detail !== 0) {
                // props.onMousewheelMove(event.layerX, event.layerY, -event.detail);
                props.handleMouseWheelMove(stage, event.layerX, event.layerY, -event.detail);

                // draw();
            }
        };

        if (!measureStage) {
            measureStageRef.current = new Stage(measureCanvas.current);
            measureStage = measureStageRef.current;
            measureStage.origin = stage.origin;
            measureStage.resolution = stage.resolution;
            measureStage.zoomFactor = stage.zoomFactor;

            measureStage.on("stagemousedown", handleMouseDown);
            measureStage.on("stagemousemove", handleMouseMove);
            // measureStage.on("stagemouseup", handleMouseUp);

            measureStage.canvas.addEventListener("mousewheel", handleMouseWheel);
            measureStage.canvas.addEventListener("DOMMouseScroll", handleMouseWheelFox);
        }

        return function componentWillUnmount() {
            measureStage.clear();
            measureStage.removeAllChildren();
            measureStage.removeAllEventListeners();
        }

    }, [measureStarted, stage, props]);

    useEffect(() => {
        if (measureStarted) {
            draw();
        }
    })

    let mainCanvas = stage.canvas;
    let width = mainCanvas.width;
    let height = mainCanvas.height;
    let top = mainCanvas.offsetTop;
    let left = mainCanvas.offsetLeft;

    return (
        <canvas tabIndex="1" ref={measureCanvas}
                width={width}
                height={height}
                style={{position: 'absolute', top: top, left: left}}
        >
        </canvas>
    )
};

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
