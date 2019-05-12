import {Component} from 'react';
import ReactDOM from 'react-dom';

const snackbarRoot = document.getElementById('snackbar-root');

class SnackbarRoot extends Component {
    constructor(props) {
        super(props);
        this.el = document.createElement('div');
    }

    componentDidMount() {
        snackbarRoot.appendChild(this.el);
    }

    componentWillUnmount() {
        snackbarRoot.removeChild(this.el);
    }

    render() {
        return ReactDOM.createPortal(
            // Any valid React child: JSX, strings, arrays, etc.
            this.props.children,
            // A DOM element
            this.el,
        );
    }
}

export default SnackbarRoot;