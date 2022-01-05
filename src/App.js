import {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppBody from './AppBody';
import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
// import Signup from './containers/Auth/SignUp/Signup';
// import Login from './containers/Auth/Login/Login';
// import Logout from './containers/Auth/Logout';
import {connect} from 'react-redux';

import './App.css';

// import CloudDocument from './components/Constructions/CloudDocument';
import Demo from './components/Constructions/Demo';
// import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";
import Spinner from "./components/UI/Spinner/Spinner";
// import DocumentsComponent from "./containers/DocumentsComponent/DocumentsComponent";
import * as authActions from "./store/actions/auth";

class App extends Component {
    componentDidMount() {
        this.props.authCheckState();
        window.addEventListener('beforeunload', function (e) {
            e.preventDefault();
            e.returnValue = '';
        });
    }
    componentDidUpdate() {
        if (this.props.location.pathname === '/' && this.props.document.id !== undefined) {
            this.props.history.push("/documents/" + this.props.document.id)
        }

        // if (this.props.location.pathname.split('/').length > 2 &&
        //     this.props.location.pathname.split('/')[2].length > 0 &&
        //     this.props.document.id === undefined) {
        //     this.props.history.push("/");
        // }
    }

    render() {
        return (
            <div className="App">
                <HeaderComponent
                    title={this.props.title}
                    version={this.props.version}
                    isAuthenticated={this.props.isAuthenticated}
                    username={this.props.username}
                />

                <AppBody/>

                <Switch>
                    {/*<Route path="/documents" exact component={DocumentsComponent}/>*/}
                    {/*<Route path="/signup" component={Signup} />*/}
                    {/*<Route path="/login" component={Login} />*/}
                    {/*<Route path="/logout" component={Logout} />*/}

                    <Route path="/demo" exact component={Demo}/>
                    {/*<Route path="/" component={AppBody}/>*/}

                    {/*<Route path="/documents/:id" component={CloudDocument}/>*/}


                    <Route path="/skeleton" component={SkeletonRecognition}/>
                    <Route path="/collision-distance" component={CollisionDemo}/>

                </Switch>

                {this.props.showSpinner ? <Spinner/> : null}
            </div>
        );
    }
}

const mapStateToProps = ({auth, app, cloudStorage}) => {
    return {
        title: app.title,
        version: app.version,
        showSpinner: app.showSpinner,
        document: cloudStorage.document,
        isAuthenticated: auth.token !== null,
        username: auth.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        authCheckState: () => dispatch(authActions.authCheckState())
    }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));

/*
                    <Route path="/boolean-test" component={BooleanTest}/>
 */
