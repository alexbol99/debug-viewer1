import React from 'react';
import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css';

const navigation = () => {
    return (
        <ul className={classes.Navigation}>
            <li><NavLink to="/" exact><h4>Editor</h4></NavLink></li>
            <li><NavLink to="/documents"><h4>Cloud Storage</h4></NavLink></li>
            <li style={{align:"right"}}><NavLink to="/login"><h4>Login</h4></NavLink></li>
        </ul>
    );
};

export default navigation;