/**
 * Created by alexanderbol on 21/04/2017.
 */
import React from 'react';
export const DisplayCoordsTool = (props) => {
    const format = (num) => {
        return (num/props.divisor).toFixed(props.decimals);
    }

    let mainCanvas = props.stage.canvas;
    let top = mainCanvas.offsetTop + 10;
    let left = mainCanvas.offsetLeft + 10;
    let x = props.stage.C2W_X(props.coordX);
    let y = props.stage.C2W_Y(props.coordY);
    return (
        <div style={{position: 'absolute', top: top, left: left}}>
            <h5 style={{margin: 0, padding: 3}}>
                X: {format(x)} Y: {format(y)}
            </h5>
        </div>
    )
}
