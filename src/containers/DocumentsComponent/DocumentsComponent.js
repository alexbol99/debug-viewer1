import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link/*, Switch*/} from 'react-router-dom';
import * as cloudActions from '../../store/actions/cloudStorageActions';
import * as actions from "../../store/actions/appActions";
import classes from './DocumentsComponent.module.css';
import DocumentComponentCell from '../../components/Documents/DocumentComponentCell';

class DocumentsComponent extends Component {
    componentDidMount = () => {
        cloudActions.fetchDocumentsFromDatabase()
            .then((response) => {
                this.props.requestFetchDocumentsFromDatabaseSucceed(response.data);
                this.props.asyncOperationEnded();
            });
        if (this.props.documentsList.length === 0) {
            this.props.asyncOperationStarted();
        }
    };

    render() {
        return (
            <div className={classes.DocumentComponent}>
                <h2>My Cloud Documents</h2>
                {/*<hr />*/}
                <div className={classes.DocumentComponentGrid}>
                    {Object.keys(this.props.documentsList).map(key => {
                        let document = this.props.documentsList[key];
                        return (<DocumentComponentCell key={key}
                                                       id={key}
                                                       document={document}/>)
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        documentsList: state.cloudStorage.documentsList
    }
};

const mapDispatchToProps = dispatch => {
    return {
        asyncOperationStarted: () => dispatch(actions.asyncOperationStarted()),
        asyncOperationEnded: () => dispatch(actions.asyncOperationEnded()),
        requestFetchDocumentsFromDatabaseSucceed: (documentsList) =>
            dispatch(cloudActions.requestFetchDocumentsFromDatabaseSucceed(documentsList))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsComponent);
