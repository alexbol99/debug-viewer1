import {NavLink} from "react-router-dom";
import classes from './Navigation.module.css';

const navigation = (props) => {
    return (
        <ul className={classes.Navigation}>
            <li><NavLink to="/" exact>Editor</NavLink></li>
            <li><NavLink to="/documents">Cloud Storage</NavLink></li>

            {props.isAuthenticated ?
                <li><NavLink to="/logout">Log Out</NavLink></li> :
                <li><NavLink to="/login">Log In</NavLink></li>
            }
        </ul>
    );
};

export default navigation;