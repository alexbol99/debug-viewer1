import React from 'react';
import FontAwesome from "react-fontawesome";
import classes from "./Button.module.css";

const button = (props) => {
    let iconStyle;
    switch (props.type) {
        case "trigger":
            iconStyle = classes.IconTrigger;
            break;
        case "mode":
            iconStyle = props.active ? classes.IconModeActive : classes.IconModeNotActive;
            break;
        default:
            iconStyle = classes.IconTrigger;
            break;
    }
    return (
        <button title={props.title} onClick={props.onClick} className={classes.Button}>
            <FontAwesome
                name={props.iconName}
                size='2x'
                className={iconStyle}
            />
        </button>
    );
};

export default button;