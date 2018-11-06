import React from 'react';
import MainComponent from "./containers/MainComponent/MainComponent";
import LayersList from "./containers/LayerList/LayersList";
import AsideComponent from "./components/Layout/AsideComponent/AsideComponent";
import * as ActionTypes from "./store/actionTypes";
import { connect } from "react-redux";

const appBody = (props) => {
    return (
        <div className="App-body" onPaste={props.pasteDataFromBuffer}>
            <MainComponent />
            <LayersList />
            <AsideComponent />
        </div>
    );
};

const mapStateToProps = state => {
    return {
    }
};

const mapDispatchToProps = dispatch => {
    return {
        pasteDataFromBuffer: (event) => dispatch({
            type: ActionTypes.DATA_FROM_BUFFER_PASTED,
            data: event.clipboardData
        })
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(appBody);