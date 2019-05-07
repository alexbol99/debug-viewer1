import React, {Component} from 'react';
import ModalPopup from "../UI/ModalPopup/ModalPopup";
import {createXMLString} from "../../dataParsers/createXML";

import classes from "./DownloadPopup.module.css";

class DownloadPopup extends Component {
    render() {
        let downloadData = this.props.showPopup ?
            this.props.layers.map( layer => {
            return layer.displayed ? {
                filename: `${layer.name}.xml`,
                xmlString: createXMLString(layer.shapes)
            } : null
        }) : [];
        return this.props.showPopup ? (
            <ModalPopup
                showPopup={this.props.showPopup}
                closePopup={this.props.closePopup}
                header="Download files"
            >
                <div className={classes.DownloadPopup}>
                    <h5>Click to the following links to start download</h5>
                    <ul>

                        {downloadData.map(data =>
                            data === null ? null :
                            <li key={data.filename}>
                                <a href={'data:text/json;charset=utf-8,' + encodeURIComponent(data.xmlString)}
                                   download={data.filename}>
                                    {data.filename}
                                </a>
                            </li>
                        )}

                    </ul>
                </div>
            </ModalPopup>
        ) : null;
    }
}

export default DownloadPopup;
