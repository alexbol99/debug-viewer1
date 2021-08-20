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
    // eslint-disable-next-line
    let buttonStyle = props.mobileOnly ? classes["Button","DrawerButton"] : classes["Button"];
    return (
        <button title={props.title} onClick={props.onClick} className={buttonStyle}>
            <FontAwesome
                name={props.iconName}
                size='2x'
                className={iconStyle}
            />
        </button>
    );
};

export default button;