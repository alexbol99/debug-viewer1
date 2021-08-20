import FontAwesome from "react-fontawesome";
import classes from "./ButtonSeparator.module.css";

const buttonSeparator = () => {
    return (
        <div className={classes.ButtonSeparator}>
            <FontAwesome
                name='ellipsis-v'
                size='2x'
                className={classes.IconSeparator}
            />
        </div>
    );
};

export default buttonSeparator;