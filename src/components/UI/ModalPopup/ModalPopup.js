import {Component} from 'react';
import Modal from '../Modal';
import classes from './ModalPopup.module.css';

class ModalPopup extends Component {
    offsetX;
    offsetY;
    dragX;
    dragY;

    onBackDropClicked = (ev) => {
        if (ev.target.id === "backDrop") {
            this.props.closePopup();
        }
    };

    handleKeyDown = (ev) => {
        if (ev.code === "Escape") {
            this.props.closePopup();
        }
    };

    elementDrag = (ev) => {
        ev = ev || window.event;
        // calculate the new cursor position:
        this.offsetX = this.dragX - ev.clientX;
        this.offsetY = this.dragY - ev.clientY;
        this.dragX = ev.clientX;
        this.dragY = ev.clientY;
        // set the element's new position:
        let element = ev.target;
        element.style.top = (element.offsetTop - this.offsetY) + "px";
        element.style.left = (element.offsetLeft - this.offsetX) + "px";
    };

    closeDragElement = (ev) => {
        /* stop moving when mouse button is released:*/
        ev.target.onmouseup = null;
        ev.target.onmousemove = null;
    };

    dragMouseDown = (ev) => {
        ev = ev || window.event;
        // get the mouse cursor position at startup:
        this.dragX = ev.clientX;
        this.dragY = ev.clientY;
        ev.target.onmouseup = this.closeDragElement;
        // call a function whenever the cursor moves:
        ev.target.onmousemove = this.elementDrag;
    };

    componentDidMount() {
        document.addEventListener('keydown', this.handleKeyDown);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.handleKeyDown);
    }

    render() {
        return this.props.showPopup ? (
            <Modal>
                <div
                    id="backDrop"
                    className={classes.BackDrop}
                    onClick={this.onBackDropClicked}
                >
                    <div className={classes.ModalPopup}
                         onMouseDown={this.dragMouseDown}
                    >
                        <header>{this.props.header}</header>
                        {this.props.children}
                    </div>
                </div>
            </Modal>
        ) : null;
    }
}

export default ModalPopup;
