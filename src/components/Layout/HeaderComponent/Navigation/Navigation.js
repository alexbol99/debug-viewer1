import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css';

const navigation = () => {
    return (
        <ul className={classes.Navigation}>
            <li><NavLink to="/" exact>Editor</NavLink></li>
            <li><NavLink to="/documents">Cloud Storage</NavLink></li>
        </ul>
    );
};

export default navigation;