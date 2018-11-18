import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';

import AppBody from './AppBody';

import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
import {connect} from 'react-redux';

import './App.css';

// import CloudDocument from './components/Constructions/CloudDocument';
import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";
import Spinner from "./components/UI/Spinner/Spinner";
import DocumentsComponent from "./containers/DocumentsComponent/DocumentsComponent";
import ModalPopup from "./components/UI/ModalPopup/ModalPopup";
import AboutPopup from "./components/AboutPopup/AboutPopup";

class App extends Component {
    onManageCloudStorageButtonClicked = () => {
        this.props.history.push('/documents');
    }
    render() {
        return (
            <div className="App">
                <HeaderComponent
                    title={this.props.title}
                    version={this.props.version}
                />


                <Switch>
                    <Route path="/documents" component={DocumentsComponent}/>

                    <Route path="/about" render={ props => (<ModalPopup {...props}
                                                                        showPopup={this.props.showAboutPopup}
                                                                        closePopup={this.props.toggleAboutPopup}
                    >
                        <AboutPopup
                            title={this.props.title}
                            version={this.props.version}
                            build={this.props.build}
                            // onCloseAboutPopupPressed={this.closeAboutPopup}
                        />
                    </ModalPopup>)} />

                    <Route path="/" render={props => (<AppBody
                        {...props}
                        onManageCloudStorageButtonClicked={this.onManageCloudStorageButtonClicked} />)}
                    />


                    {/*<Route path="/documents/:id" component={CloudDocument}/>*/}

                    <Route path="/demo" component={Demo}/>
                    <Route path="/boolean-test" component={BooleanTest}/>
                    <Route path="/skeleton" component={SkeletonRecognition}/>
                    <Route path="/collision-distance" component={CollisionDemo}/>

                </Switch>

                {this.props.showSpinner ? <Spinner/> : null}
            </div>
    );
    }
    }

    const mapStateToProps = ({app, cloudStorage}) => {
        return {
        title: app.title,
        version: app.version,
        showSpinner: app.showSpinner,
        document: cloudStorage.document
    }
    };

    export default withRouter(connect(mapStateToProps, null)(App));
