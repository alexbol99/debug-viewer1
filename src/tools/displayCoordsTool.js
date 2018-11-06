/**
 * Created by alexanderbol on 21/04/2017.
 */
import React from 'react';
export const DisplayCoordsTool = ({stage, coordX, coordY, divisor, decimals}) => {
    const format = (num) => {
        return (num/divisor).toFixed(decimals);
    };

    let mainCanvas = stage.canvas;
    let top = mainCanvas.offsetTop + 10;
    let left = mainCanvas.offsetLeft + 10;
    let x = stage.C2W_X(coordX);
    let y = stage.C2W_Y(coordY);
    return (
        <div style={{position: 'absolute', top: top, left: left}}>
            <h5 style={{margin: 0, padding: 3}}>
                X: {format(x)} Y: {format(y)}
            </h5>
        </div>
    )
}
