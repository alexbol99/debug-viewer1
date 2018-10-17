/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import classes from './AboutPopup.module.css';

const AboutPopup = (props) => {
    let offsetX, offsetY;
    let dragX, dragY;

    let onCloseButtonPressed = () => {
        props.onCloseAboutPopupPressed();
    };

    let handleKeyDown = (ev) => {
        if (ev.code === "Escape") {
            props.onCloseAboutPopupPressed();
        }
    };

    let elementDrag = (ev) => {
        ev = ev || window.event;
        // calculate the new cursor position:
        offsetX = dragX - ev.clientX;
        offsetY = dragY - ev.clientY;
        dragX = ev.clientX;
        dragY = ev.clientY;
        // set the element's new position:
        let element = ev.target;
        element.style.top = (element.offsetTop - offsetY) + "px";
        element.style.left = (element.offsetLeft - offsetX) + "px";
    };

    let closeDragElement = (ev) => {
        /* stop moving when mouse button is released:*/
        ev.target.onmouseup = null;
        ev.target.onmousemove = null;
    };

    let dragMouseDown = (ev) => {
        ev = ev || window.event;
        // get the mouse cursor position at startup:
        dragX = ev.clientX;
        dragY = ev.clientY;
        ev.target.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        ev.target.onmousemove = elementDrag;
    };

    document.addEventListener('keydown', handleKeyDown);

    return (
        <div className={classes.modal}>
            <div className={classes["App-modal-popup"]}
                 id="aboutPopup"
                 onMouseDown={dragMouseDown}
                 onMouseMove={elementDrag}
            >
                <h2>{props.title} v{process.env.REACT_APP_VERSION}</h2>
                <h4>Build 362de89c 25/02/2018</h4>
                <button onClick={onCloseButtonPressed}>Close</button>
            </div>
        </div>
    )
};

export default AboutPopup;