import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link/*, Switch*/} from 'react-router-dom';
import * as cloudActions from '../../store/actions/cloudStorageActions';
import * as actions from "../../store/actions/appActions";
import classes from './DocumentsComponent.module.css';
import DocumentComponentCell from '../../components/Documents/DocumentComponentCell';

class DocumentsComponent extends Component {
    deleteDocumentFromDatabase = (id) => {
        cloudActions.deleteDocumentFromDatabase(id)
            .then((response) => {
                // const index = this.props.documentsList.findIndex((doc) => doc.id === id);
                this.props.deleteDocumentFromDatabaseSucceed(id);
                this.props.asyncOperationEnded();
            });
        this.props.asyncOperationStarted();
    };

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
                        return (<DocumentComponentCell
                            key={key}
                            id={key}
                            document={document}
                            deleteDocumentFromDatabase={this.deleteDocumentFromDatabase}
                        />)
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
            dispatch(cloudActions.requestFetchDocumentsFromDatabaseSucceed(documentsList)),
        deleteDocumentFromDatabaseSucceed: (id) =>
            dispatch(cloudActions.deleteDocumentFromDatabaseSucceed(id))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsComponent);
