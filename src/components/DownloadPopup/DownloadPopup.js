import React, {useState, useEffect} from 'react';
import ModalPopup from "../UI/ModalPopup/ModalPopup";
import {createXMLString} from "../../dataParsers/createXML";

import classes from "./DownloadPopup.module.css";

const DownloadPopup = (props) => {
    const [downloadData, setDownloadData] = useState([]);

    useEffect( () => {
        const newDownloadData = props.layers.map(layer => {
            return layer.displayed ? {
                filename: `${layer.name}.xml`,
                xmlString: createXMLString(layer.shapes)
            } : null
        });
        setDownloadData(newDownloadData);
    }, [props.layers]);

    return props.showPopup ? (
        <ModalPopup
            showPopup={props.showPopup}
            closePopup={props.closePopup}
        >
            <div className={classes.DownloadPopup}>
                <h5>Click to the following links to start download</h5>
                <ul>

                    {downloadData.map(data =>
                        data === null ? null :
                            <li>
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
};

export default DownloadPopup;
