import {useEffect, useRef} from 'react';
import Modal from '../Modal';
import classes from './ModalPopup.module.css';

const BackDrop = (props) => {
    const backDropRef = useRef();

    const onBackDropClicked = (ev) => {
        if (ev.target === backDropRef.current) {
            props.closePopup();
        }
    };

    return <div ref={backDropRef} className={classes.BackDrop} onClick={onBackDropClicked}>
        {props.children}
    </div>
}

const ModalPopup = (props) => {
    let offsetX;
    let offsetY;
    let dragX;
    let dragY;

    const elementDrag = (ev) => {
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

    const closeDragElement = (ev) => {
        /* stop moving when mouse button is released:*/
        ev.target.onmouseup = null;
        ev.target.onmousemove = null;
    };

    const dragMouseDown = (ev) => {
        ev = ev || window.event;
        // get the mouse cursor position at startup:
        dragX = ev.clientX;
        dragY = ev.clientY;
        ev.target.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        ev.target.onmousemove = elementDrag;
    };

    useEffect( () => {
        const handleKeyDown = (ev) => {
            if (ev.code === "Escape") {
                props.closePopup();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [props])

    return props.showPopup && (
        <Modal>
            <BackDrop closePopup={props.closePopup}>
                <div className={classes.ModalPopup} onMouseDown={dragMouseDown}>
                    <header>{props.header}</header>
                    {props.children}
                </div>
            </BackDrop>
        </Modal>
    )
}

export default ModalPopup;
