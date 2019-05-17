import React, {Component} from 'react';
import ModalPopup from "../UI/ModalPopup/ModalPopup";
import Snackbar from "../UI/Snackbar/Snackbar";

import classes from "./UploadPopup.module.css";

class UploadPopup extends Component {
    inputElement = React.createRef();
    clipboardWindowRef = React.createRef();

    clipboardWindowWidth = 0;
    clipboardWindowHeight = 0;

    state = {
        dragOver:false,
        clipboardData: ""
    };

    openFilesButtonClicked = () => this.inputElement.current.click();

    pasteHandler = (ev) => {
        ev.stopPropagation();
        this.props.onPaste(ev.clipboardData);
        let item = ev.clipboardData.items[0];
        item.getAsString( string =>
            this.setState({
                clipboardData: string
            })
        );
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
                }
            }
        } else {
            // Use DataTransfer interface to access the file(s)
            files = ev.dataTransfer.files;
        }

        this.props.onFileDrop(files);
        this.setState({dragOver:false});
    };

    dragOverHandler = (ev) => {
        // Prevent default behavior (Prevent file from being opened)
        ev.preventDefault();
        this.setState({dragOver:true})
    };

    dragLeaveHandler = (ev) => {
        ev.preventDefault();
        this.setState({dragOver:false})
    };

    componentDidMount() {
        this.clipboardWindowWidth = this.clipboardWindowRef.current.clientWidth;
        this.clipboardWindowHeight = this.clipboardWindowRef.current.clientHeight;
    }

    render() {
        let pX = this.state.clipboardData === "" ? 30 : 0;
        let pY = this.state.clipboardData === "" ? 60 : 0;
        return this.props.showPopup ? (
            <ModalPopup
                showPopup={this.props.showPopup}
                closePopup={this.props.closePopup}
                header="Upload files"
            >
                <div className={classes.UploadPopup}>
                    <div className={this.state.dragOver ?
                        `${classes.UploadTarget} ${classes.UploadTargetDragOver}` :
                        `${classes.UploadTarget} ${classes.UploadTargetDragLeave}`}
                         style={{paddingLeft: pX, paddingRight: pX, paddingTop: pY, paddingBottom: pY}}
                         onPaste={this.pasteHandler}
                         onDrop={this.dropHandler}
                         onDragOverCapture={this.dragOverHandler}
                         onDragLeaveCapture={this.dragLeaveHandler}
                         ref={this.clipboardWindowRef}
                    >
                        {
                            this.state.clipboardData === "" ?
                                <span>Paste from buffer / Drop files</span> :
                                <p style={{width:this.clipboardWindowWidth, height:this.clipboardWindowHeight}}>
                                    {this.state.clipboardData}
                                </p>
                        }

                    </div>

                    <h2>or</h2>

                    <button onClick={this.openFilesButtonClicked}>
                        Open local files
                    </button>

                    <input style={{display: "none"}}
                           type="file" ref={this.inputElement} name="files[]" multiple
                           onChange={this.props.onFileSelected}
                    />

                    { this.state.clipboardData !== "" ?
                        <Snackbar
                            message="New layer added"
                        /> : null
                    }

                </div>
            </ModalPopup>
        ) : null;
    }
}

export default UploadPopup;
