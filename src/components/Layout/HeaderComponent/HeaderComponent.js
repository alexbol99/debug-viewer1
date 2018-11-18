/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import { NavLink } from 'react-router-dom';
import classes from './HeaderComponent.module.css';
import Logo from './Logo/Logo';
// import DocumentsComponent from "../../../containers/DocumentsComponent/DocumentsComponent";
// import MainComponent from "../../../containers/MainComponent/MainComponent";

const HeaderComponent = (props) => {
    return (
        <header className={classes["App-header"]}>
            <Logo />
            {/*<h2>{props.title}</h2>*/}
            <ul>
                <NavLink to="/" exact>Editor</NavLink>
                <NavLink to="/documents">Cloud Storage</NavLink>
            </ul>
        </header>
    )
};

export default HeaderComponent;