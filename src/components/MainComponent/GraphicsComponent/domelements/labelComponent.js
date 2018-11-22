import React from 'react';
import classes from '../LabelsLayerComponent/labelsLayer.module.css';

const labelComponent = ( {stage, shape} ) => {
    let center = shape.geom.center || shape.geom;  // Point has no method center
    let left = stage.canvas.offsetLeft + stage.W2C_X(center.x) + 6;
    let top = stage.canvas.offsetTop + stage.W2C_Y(center.y) - 4;
    let inside = left > stage.canvas.offsetLeft && left < stage.canvas.offsetLeft + stage.canvas.width &&
        top > stage.canvas.offsetTop && top < stage.canvas.height;

    return inside ? (
        <div style={{position:"absolute", left:left+"px", top: top+"px"}} className={classes.LabelComponent}>
            <h5>{shape.label}</h5>
        </div>
    ) : null;
};

export default labelComponent;