import React, {Component} from 'react';
import { BrowserRouter, Route/*, Switch*/ } from 'react-router-dom';

import HeaderComponent from './components/Layout/HeaderComponent/HeaderComponent';
import MainComponent from './containers/MainComponent/MainComponent';
import LayersList from './containers/LayerList/LayersList';
import AsideComponent from './components/Layout/AsideComponent/AsideComponent';

import * as ActionTypes from './store/action-types';
import './App.css';
// import asyncComponent from "./components/HighOrderComponents/asyncComponent";

import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
import CollisionDemo from "./components/Constructions/CollisionDemo";

// const AsyncDemo = asyncComponent( () => {
//     return import("./components/Constructions/Demo");
// });


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

    handleHashChange = (event) => {
        this.props.store.dispatch({
            type: ActionTypes.WINDOW_HASH_CHANGED,
            stage: this.state.app.stage
        });
    };

    componentWillMount() {
        // this.dispatch = this.props.store.dispatch;
        this.setState(this.props.store.getState());
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps.store.getState());
    }

    componentDidMount(e) {
        window.onhashchange = this.handleHashChange;
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <HeaderComponent
                        title={this.state.app.title}
                        version={this.state.app.version}
                    />

                    <Route path="/" render={(props) =>
                        <div className="App-body" onPaste={this.handlePaste}>
                            <MainComponent {...this.props} />
                            <LayersList
                                dispatch={this.props.store.dispatch}
                                stage={this.state.app.stage}
                                layers={this.state.layers}
                            />
                            <AsideComponent/>
                        </div>
                    }
                    />


                    <Route path="/demo" render={(props) =>
                        <Demo {...props}
                              dispatch={this.props.store.dispatch}
                              stage={this.state.app.stage}
                              layers={this.state.layers} />}
                    />

                    <Route path="/boolean-test" render={(props) =>
                        <BooleanTest {...props}
                                     dispatch={this.props.store.dispatch}
                                     stage={this.state.app.stage}
                                     layers={this.state.layers} />}
                    />

                    <Route path="/skeleton" render={ (props) =>
                        <SkeletonRecognition {...props}
                                             dispatch={this.props.store.dispatch}
                                             applySkeletonRecognition={this.state.app.applySkeletonRecognition}/>}
                    />

                    <Route path="/collision-distance" render={ (props) =>
                        <CollisionDemo {...props}
                                       dispatch={this.props.store.dispatch}
                                       stage={this.state.app.stage}
                                       layers={this.state.layers}
                                       parser={this.state.app.parser} />}
                    />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
