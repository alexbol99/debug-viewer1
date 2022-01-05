import classes from './Snackbar.module.css';
import ReactDOM from "react-dom";

const Snackbar = ({message, onAnimationEnd}) => {
    return ReactDOM.createPortal(
        // Any valid React child: JSX, strings, arrays, etc.
        <div className={classes.Snackbar} onAnimationEnd={onAnimationEnd}>
            <h3>{message}</h3>
        </div>,
        // A DOM element
        document.getElementById('snackbar-root'),
    );
}

export default Snackbar;