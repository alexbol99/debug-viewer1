import {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect, NavLink } from 'react-router-dom';

import * as authActions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Login.module.css';

class Login extends Component {
    state = {
        email: "",
        password: ""
    };

    submitForm = (event) => {
        event.preventDefault();
        this.props.logIn(this.state.email, this.state.password);
    };

    controlChanged = (event) => {
        const updatedState = {
            ...this.state,
            [event.target.name]: event.target.value
        };
        this.setState(updatedState);
    };

    render() {
        return (
            <div className={classes.AuthForm}>
                <form onSubmit={this.submitForm}>
                    <input type="email" value={this.state.email} name="email" placeholder="e-mail address" onChange={this.controlChanged} />
                    <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.controlChanged} />
                    <button>Log In</button>
                </form>

                {this.props.loading ? <Spinner/> : null}

                {this.props.error ? <h4>{this.props.error.message}</h4> : null}

                {this.props.isAuthenticated ? <Redirect to="/" /> : null}

                <span>Not registered yet?</span><NavLink to="signup">Sign Up</NavLink>
            </div>
        );
    }
}

const mapStateToProps = ({auth}) => {
    return {
        loading: auth.loading,
        error: auth.error,
        isAuthenticated: auth.token !== null
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        logIn: (email, password) => dispatch(authActions.logIn(email, password))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);