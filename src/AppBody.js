import React from 'react';
import { connect } from "react-redux";
import * as ActionTypes from "./store/actionTypes";
import * as cloudActions from "./store/actions/cloudStorageActions";
import MainComponent from "./containers/MainComponent/MainComponent";
import LayersList from "./containers/LayerList/LayersList";
import AsideComponent from "./components/Layout/AsideComponent/AsideComponent";
// import DocumentName from "./components/MainComponent/DocumentName/DocumentName";

const appBody = (props) => {
    return (
        <React.Fragment>
            {/*<DocumentName name={props.document.name}*/}
                          {/*username={props.username}*/}
                          {/*updateDocumentName={props.updateDocumentName} />*/}
            <div className="App-body" onPaste={props.pasteDataFromBuffer}>
                <MainComponent history={props.history}
                               onManageCloudStorageButtonClicked={props.onManageCloudStorageButtonClicked}
                />
                <LayersList/>
                <AsideComponent/>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = ({cloudStorage, auth}) => {
    return {
        document: cloudStorage.document,
        username: auth.username
    }
};

const mapDispatchToProps = dispatch => {
    return {
        pasteDataFromBuffer: (event) => dispatch({
            type: ActionTypes.DATA_FROM_BUFFER_PASTED,
            data: event.clipboardData
        }),
        updateDocumentName: (name) => dispatch(cloudActions.updateDocumentName(name))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(appBody);
