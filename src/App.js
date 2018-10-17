import React, {Component} from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import HeaderComponent from './components/HeaderComponent/HeaderComponent';
import MainComponent from './components/MainComponent/MainComponent';
import LayersList from './components/LayersList/LayersList';
import AsideComponent from './components/AsideComponent/AsideComponent';

import Demo from './components/Constructions/Demo';

import * as ActionTypes from './actions/action-types';
import './App.css';

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
                    <div className="App-body" onPaste={this.handlePaste}>
                        <MainComponent {...this.props} />
                        <LayersList
                            dispatch={this.props.store.dispatch}
                            stage={this.state.stage}
                            layers={this.state.layers}
                        />
                        <AsideComponent/>
                        <Route path="/demo" render={ (props) =>
                            <Demo {...props}
                               dispatch={this.props.store.dispatch}
                               stage={this.state.stage}
                               layers={this.state.layers} /> }
                        />
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
