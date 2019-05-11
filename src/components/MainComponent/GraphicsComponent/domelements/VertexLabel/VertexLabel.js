import React from 'react'
import {format} from "../../../../../models/utils";
import classes from './VertexLabel.module.css';

const VertexLabel = (props) => {
    let stage = props.stage;
    let left = stage.canvas.offsetLeft + stage.W2C_X(props.vertex.x) + 6;
    let top = stage.canvas.offsetTop + stage.W2C_Y(props.vertex.y) - 10;
    // let inside = left > stage.canvas.offsetLeft && left < stage.canvas.offsetLeft + stage.canvas.width &&
    //     top > stage.canvas.offsetTop && top < stage.canvas.offsetTop + stage.canvas.height;
    let x = format(props.vertex.x, props.divisor, props.decimals);
    let y = format(props.vertex.y, props.divisor, props.decimals);

    return (
        <div className={classes.VertexLabel} style={{left:left, top:top}}>
            <h5>
                x={x} y={y}
            </h5>
        </div>
    )
};

export default VertexLabel;