import React, {Component} from 'react';
import { BrowserRouter, Route/*, Switch*/ } from 'react-router-dom';

import AppBody from './AppBody';

import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
// import MainComponent from './containers/MainComponent/MainComponent';
// import LayersList from './containers/LayerList/LayersList';
// import AsideComponent from './components/Layout/AsideComponent/AsideComponent';
//
// import * as ActionTypes from './store/actionTypes';
import { connect } from 'react-redux';

import './App.css';

import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <HeaderComponent
                        title={this.props.title}
                        version={this.props.version}
                    />

                    <Route path="/" component={AppBody} />

                    <Route path="/demo" component={Demo} />
                    <Route path="/boolean-test" component={BooleanTest} />
                    <Route path="/skeleton" component={SkeletonRecognition} />
                    <Route path="/collision-distance" component={CollisionDemo} />

                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = state => {
    return {
        title: state.app.title,
        version: state.app.version
    }
};

const mapDispatchToProps = dispatch => {
    return {}
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
