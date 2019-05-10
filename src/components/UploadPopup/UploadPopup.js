import React, {Component} from 'react';
import ModalPopup from "../UI/ModalPopup/ModalPopup";
// import {createXMLString} from "../../dataParsers/createXML";

import classes from "./UploadPopup.module.css";

class UploadPopup extends Component {
    inputElement = React.createRef();

    openFilesButtonClicked = () => this.inputElement.current.click();

    pasteHandler = (ev) => {
        ev.stopPropagation();
        this.props.onPaste(ev.clipboardData);
    };

    dropHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();

        let files = [];

        if (ev.dataTransfer.items) {
            // Use DataTransferItemList interface to access the file(s)
            for (let i = 0; i < ev.dataTransfer.items.length; i++) {
                // If dropped items aren't files, reject them
                if (ev.dataTransfer.items[i].kind === 'file') {
                    let file = ev.dataTransfer.items[i].getAsFile();
                    files.push(file);
                    // console.log('... file[' + i + '].name = ' + file.name);
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            files = ev.dataTransfer.files;
            // for (let i = 0; i < ev.dataTransfer.files.length; i++) {
                // console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
            // }
        }

        this.props.onFileDrop(files);
    };

    dragOverHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
    };

    render() {
        return this.props.showPopup ? (
            <ModalPopup
                showPopup={this.props.showPopup}
                closePopup={this.props.closePopup}
                header="Upload files"
            >
                <div className={classes.UploadPopup}>
                    <div className={classes.UploadTarget}
                         onPaste={this.pasteHandler}
                         onDrop={this.dropHandler}
                         onDragOver={this.dragOverHandler}
                    >
                        <span>Paste from buffer / Drop files</span>
                    </div>

                    <h2>or</h2>

                    <button onClick={this.openFilesButtonClicked}>
                        Open local files
                    </button>

                    <input style={{display: "none"}}
                           type="file" ref={this.inputElement} name="files[]" multiple
                           onChange={this.props.onFileSelected}
                    />

                    {/*<hr/>*/}

                    {/*<button>close</button>*/}

                </div>
            </ModalPopup>
        ) : null;
    }
}

export default UploadPopup;
