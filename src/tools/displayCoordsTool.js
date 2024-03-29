/**
 * Created by alexanderbol on 21/04/2017.
 */
import {format} from '../models/utils';

const DisplayCoordsTool = ({stage, coordX, coordY, divisor, decimals}) => {
    let mainCanvas = stage.canvas;
    let top = mainCanvas.offsetTop + 10;
    let left = mainCanvas.width - 200; //  mainCanvas.offsetLeft + 10;
    let x = stage.C2W_X(coordX);
    let y = stage.C2W_Y(coordY);
    return (
        <div style={{position: 'absolute', top: top, left: left,
            backgroundColor: 'white', opacity:0.8}}>
            <h5 style={{margin: 0, padding: 3}}>
                X: {format(x,divisor,decimals)} Y: {format(y,divisor,decimals)}
            </h5>
        </div>
    )
};

export default DisplayCoordsTool;
