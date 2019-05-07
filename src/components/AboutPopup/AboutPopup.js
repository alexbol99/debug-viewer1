/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import classes from './AboutPopup.module.css';
import ModalPopup from "../UI/ModalPopup/ModalPopup";

const AboutPopup = (props) => {
    return (
        <ModalPopup
            showPopup={props.showAboutPopup}
            closePopup={props.toggleAboutPopup}
            header="Info"
        >
            <div className={classes.AboutPopup}>
                <h2>{props.title} v{props.version}</h2>

                <label>{`Build date: `}</label>
                <span>April 2019</span>
                <br/>

                <label>{`Github depository: `}</label>
                <a href="https://github.com/alexbol99/debug-viewer1" >
                    https://github.com/alexbol99/debug-viewer1
                </a>
                <br/>

                <label>{`3d party graphics library: `}</label>
                <a href="https://github.com/CreateJS/EaselJS/tree/2.0" >
                    https://github.com/CreateJS/EaselJS/tree/2.0
                </a>
                <br/>

            </div>
        </ModalPopup>

    )
};

export default AboutPopup;
