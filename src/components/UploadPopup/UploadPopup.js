import {Component, createRef} from 'react';
import ModalPopup from "../UI/ModalPopup/ModalPopup";
import Snackbar from "../UI/Snackbar/Snackbar";
import { connect } from 'react-redux';
import classes from "./UploadPopup.module.css";
import * as actions from '../../store/actions/upload';

class UploadPopup extends Component {
    inputElement = createRef();
    clipboardWindowRef = createRef();

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

        this.props.readFiles(files, this.props.stage, this.props.layers);
        // this.fileDropHandler(files);
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

    filesSelectedHandler = (event) => {
        if (!(File && FileReader && FileList)) return;
        let files = event.target.files; // FileList object
        this.props.readFiles(files, this.props.stage, this.props.layers);
    };

    closePopup = () => {
        this.props.initUploadState();
        this.props.closePopup();
    };

    componentDidUpdate() {
        if (this.props.uploadCompleted) {}
    }

    componentDidMount() {
        this.clipboardWindowWidth = this.clipboardWindowRef.current.clientWidth;
        this.clipboardWindowHeight = this.clipboardWindowRef.current.clientHeight;
    }

    render() {
        let pX = this.state.clipboardData === "" ? 30 : 0;
        let pY = this.state.clipboardData === "" ? 60 : 0;
        let snackbarMessage = "";

        if (this.state.clipboardData !== "") snackbarMessage = "Added 1 layer";

        if (this.props.uploadCompleted && this.props.uploadedFiles.length > 0) {
            let newFilesNum = this.props.uploadedFiles.length;
            if (newFilesNum === 1) snackbarMessage = "1 layer added";
            if (newFilesNum > 1) snackbarMessage = `${newFilesNum} layers added`;
        }

        return this.props.showPopup ? (
            <ModalPopup
                showPopup={this.props.showPopup}
                closePopup={this.closePopup}
                header="Open files"
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
                                <span>Drop files here</span> :
                                <p style={{width:this.clipboardWindowWidth, height:this.clipboardWindowHeight}}>
                                    {this.state.clipboardData}
                                </p>
                        }

                    </div>

                    <h2>or</h2>

                    <button onClick={this.openFilesButtonClicked}>
                        Use system Open Dialog
                    </button>

                    <input style={{display: "none"}}
                           type="file" ref={this.inputElement} name="files[]" multiple
                           onChange={this.filesSelectedHandler}
                    />

                    { snackbarMessage !== "" ?
                        <Snackbar
                            onAnimationEnd = {this.props.initUploadState}
                            message={snackbarMessage} /> : null
                    }

                </div>
            </ModalPopup>
        ) : null;
    }
}

const mapStateToProps = state => {
    return {
        layers: state.layers,
        stage: state.app.stage,
        uploadCompleted: state.upload.uploadCompleted,
        uploadedFiles: state.upload.uploadedFiles
    }
};

const mapDispatchToProps = dispatch => {
    return {
        readFiles: (files, stage, layers) => dispatch(actions.readFiles(files, stage, layers)),
        initUploadState: () => dispatch(actions.initUploadState())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(UploadPopup);
