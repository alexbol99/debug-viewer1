import React, {Component} from 'react';
import { BrowserRouter, Route/*, Switch*/ } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import MainComponent from './components/MainComponent/MainComponent';
import LayersList from './components/LayersList/LayersList';
import AsideComponent from './components/AsideComponent/AsideComponent';

import * as ActionTypes from './actions/action-types';
import './App.css';
// import asyncComponent from "./components/HighOrderComponents/asyncComponent";

import Demo from './components/Constructions/Demo';
import BooleanTest from './components/Constructions/BooleanTest';
import SkeletonRecognition from './components/Constructions/SkeletonRecognition';
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
            stage: this.state.stage
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
                    <HeaderComponent title={this.state.app.title}/>

                    <Route path="/" render={(props) =>
                        <div className="App-body" onPaste={this.handlePaste}>
                            <MainComponent {...this.props} />
                            <LayersList
                                dispatch={this.props.store.dispatch}
                                stage={this.state.stage}
                                layers={this.state.layers}
                            />
                            <AsideComponent/>
                        </div>
                    }
                    />


                    <Route path="/demo" render={(props) =>
                        <Demo {...props}
                              dispatch={this.props.store.dispatch}
                              stage={this.state.stage}
                              layers={this.state.layers} />}
                    />

                    <Route path="/boolean-test" render={(props) =>
                        <BooleanTest {...props}
                                     dispatch={this.props.store.dispatch}
                                     stage={this.state.stage}
                                     layers={this.state.layers} />}
                    />

                    <Route path="/skeleton" render={ (props) =>
                        <SkeletonRecognition {...props}
                                             dispatch={this.props.store.dispatch}
                                             applySkeletonRecognition={this.state.app.applySkeletonRecognition}/>}
                    />

                </div>
            </BrowserRouter>
        );
    }
}

export default App;
