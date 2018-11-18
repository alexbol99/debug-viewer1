import React from 'react';
// import logoImg from "../../../assets/images/debug-viewer-logo3-notext.png";
import logoImg from "../../../../assets/images/debug-viewer-logo3.png";
import classes from "./Logo.module.css";

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={logoImg} alt="Debug Viewer Logo" />
        </div>
    );
};

export default logo;