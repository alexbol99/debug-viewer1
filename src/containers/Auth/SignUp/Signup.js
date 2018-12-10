import React, {Component} from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import * as authActions from '../../../store/actions/auth';
import Spinner from '../../../components/UI/Spinner/Spinner';
import classes from './Signup.module.css';

class Signup extends Component {
    state = {
        username: "",
        email: "",
        password: ""
    };

    submitForm = (event) => {
        event.preventDefault();
        this.props.signUp(this.state.username,
            this.state.email,
            this.state.password);
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
                    <input type="text" value={this.state.username} name="username" placeholder="username"  onChange={this.controlChanged} />
                    <input type="email" value={this.state.email} name="email" placeholder="e-mail address" onChange={this.controlChanged} />
                    <input type="password" value={this.state.password} name="password" placeholder="password" onChange={this.controlChanged} />
                    <button>Sign Up</button>
                </form>

                {this.props.loading ? <Spinner/> : null}

                {this.props.error ? <h4>{this.props.error.message}</h4> : null}

                {this.props.isAuthenticated ? <Redirect to="/" /> : null}
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
        signUp: (username, email, password, isSignUp) => dispatch(authActions.signUp(username, email, password, isSignUp))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Signup);