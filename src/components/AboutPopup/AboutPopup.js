/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import classes from './AboutPopup.module.css';

const AboutPopup = (props) => {
    return (
        <div className={classes.AboutPopup}>
            <h2>{props.title} v{props.version}</h2>
            <h4>Build October 2018</h4>
        </div>
    )
};

export default AboutPopup;