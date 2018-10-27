import React from 'react';
import logoImg from "../../../assets/images/debug-viewer-logo6-notext.png";
import classes from "./Logo.css";

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logoImg} alt="Debug Viewer Logo" />
        </div>
    );
};

export default logo;