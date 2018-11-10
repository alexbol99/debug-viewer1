/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import classes from './HeaderComponent.module.css';
import Logo from '../Logo/Logo';

const HeaderComponent = (props) => {
    return (
        <header className={classes["App-header"]}>
            <Logo />
            <h2>{props.title}</h2>
        </header>
    )
};

export default HeaderComponent;