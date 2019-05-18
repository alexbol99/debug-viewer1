import React,{Component} from 'react';
import SnackbarRoot from '../SnackbarRoot';
import classes from './Snackbar.module.css';

class Snackbar extends Component {
    state = {
        display: true
    };

    animationEndHandler() {
        this.setState({
            display: false
        });
        this.props.onAnimationEnd();
    }

    render() {
        return ( this.state.display ?
            <SnackbarRoot>
                <div className={classes.Snackbar} onAnimationEnd={this.props.onAnimationEnd}>
                    <h3>{this.props.message}</h3>
                </div>
            </SnackbarRoot> : null
        )
    }
}

export default Snackbar;