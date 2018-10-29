import React, {Component} from 'react';
import { BrowserRouter, Route/*, Switch*/ } from 'react-router-dom';

import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
import MainComponent from './containers/MainComponent/MainComponent';
import LayersList from './containers/LayerList/LayersList';
import AsideComponent from './components/Layout/AsideComponent/AsideComponent';

import * as ActionTypes from './store/actionTypes';
import { connect } from 'react-redux';

import './App.css';

import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = this.props.store.getState();
        this.props.store.subscribe(() => {
            this.setState(this.props.store.getState());
        });
    }

    handlePaste = (event) => {
        this.props.store.dispatch({
            type: ActionTypes.DATA_FROM_BUFFER_PASTED,
            data: event.clipboardData
        });
    };

    componentWillMount() {
        // this.dispatch = this.props.store.dispatch;
        this.setState(this.props.store.getState());
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.store.getState());
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <HeaderComponent
                        title={this.props.title}
                        version={this.props.version}
                    />

                    <Route path="/" render={(props) =>
                        <div className="App-body" onPaste={this.handlePaste}>
                            <MainComponent {...this.props} />
                            <LayersList />
                            <AsideComponent />
                        </div>
                    }
                    />

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
    return {
        panAndZoomToShape: (stage, layer) => dispatch({
            type: ActionTypes.PAN_AND_ZOOM_TO_SHAPE,
            stage: stage,
            shape: layer
        }),
        addNewLayer: (layer) => dispatch({
            type: ActionTypes.ADD_NEW_LAYER,
            layer: layer
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
