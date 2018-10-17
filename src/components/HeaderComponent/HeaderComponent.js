/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import classes from './HeaderComponent.module.css';

const HeaderComponent = (props) => {
    return (
        <header className={classes["App-header"]}>
            <h2>{props.title} v{process.env.REACT_APP_VERSION}</h2>
        </header>
    )
};

export default HeaderComponent;