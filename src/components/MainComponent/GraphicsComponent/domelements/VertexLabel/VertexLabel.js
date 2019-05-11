import React from 'react'
import classes from './VertexLabel.module.css';

const VertexLabel = (props) => {
    let stage = props.stage;
    let left = stage.canvas.offsetLeft + stage.W2C_X(props.vertex.x) + 6;
    let top = stage.canvas.offsetTop + stage.W2C_Y(props.vertex.y) - 4;
    // let inside = left > stage.canvas.offsetLeft && left < stage.canvas.offsetLeft + stage.canvas.width &&
    //     top > stage.canvas.offsetTop && top < stage.canvas.offsetTop + stage.canvas.height;

    return (
        <div className={classes.VertexLabel} style={{left:left, top:top}}>
            x={props.vertex.x} y={props.vertex.y}
        </div>
    )
};

export default VertexLabel;