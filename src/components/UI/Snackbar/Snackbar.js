import React,{Component} from 'react';
import SnackbarRoot from '../SnackbarRoot';
import classes from './Snackbar.module.css';

let timeout1, timeout2;

class Snackbar extends Component {
    state = {
        display: true,
        finished: false
    };

    componentDidMount() {
        timeout1 = setTimeout( () => {
            this.setState({finished:true})
        }, 5000);
        timeout2 = setTimeout( () => {
            this.setState({display:false})
        }, 7000);
    }

    componentWillUnmount() {
        clearTimeout(timeout1);
        clearTimeout(timeout2);
    }

    render() {
        const styleName = this.state.finished ?
            [classes.Snackbar, classes.SnackbarFadeOut].join(' ') :
            [classes.Snackbar, classes.SnackbarFadeIn].join(' ');

        return ( this.state.display ?
            <SnackbarRoot>
                <div className={styleName} onAnimationEnd={this.props.onAnimationEnd}>
                    <h3>{this.props.message}</h3>
                </div>
            </SnackbarRoot> : null
        )
    }
}

export default Snackbar;