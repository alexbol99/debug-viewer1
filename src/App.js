import React, {Component} from 'react';
import { Route, Switch } from 'react-router-dom';

import AppBody from './AppBody';

import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
import { connect } from 'react-redux';

import './App.css';

import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";
import Spinner from "./components/UI/Spinner/Spinner";
import DocumentsComponent from "./containers/DocumentsComponent/DocumentsComponent";

class App extends Component {
    render() {
        return (
            <div className="App">
                <HeaderComponent
                    title={this.props.title}
                    version={this.props.version}
                />


                <Route path="/" exact component={AppBody}/>

                <Route path="/demo" component={Demo}/>
                <Route path="/boolean-test" component={BooleanTest}/>
                <Route path="/skeleton" component={SkeletonRecognition}/>
                <Route path="/collision-distance" component={CollisionDemo}/>

                <Route path="/documents" exact component={DocumentsComponent}/>

                {this.props.showSpinner ? <Spinner /> : null}
            </div>
        );
    }
}

const mapStateToProps = ({app}) => {
    return {
        title: app.title,
        version: app.version,
        showSpinner: app.showSpinner
    }
};

export default connect(mapStateToProps, null)(App);
