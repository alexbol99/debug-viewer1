import React, {Component} from 'react';
import {connect} from 'react-redux';
// import {Link/*, Switch*/} from 'react-router-dom';
import * as cloudActions from '../../store/actions/cloudStorageActions';
import * as actions from "../../store/actions/appActions";
import classes from './DocumentsComponent.module.css';
import DocumentComponentCell from '../../components/Documents/DocumentComponentCell';

class DocumentsComponent extends Component {
    state = {
        updated: false
    };

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
        if (!this.props.token) return;
        // if (this.state.updated) return;
        cloudActions.fetchDocumentsFromDatabase(this.props.token, this.props.userId)
            .then((response) => {
                this.props.requestFetchDocumentsFromDatabaseSucceed(response.data);
                this.props.asyncOperationEnded();

            });
        if (this.props.documentsList.length === 0) {
            this.props.asyncOperationStarted();
        }
        // this.setState({updated:true});
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
                            documentSelectedFromList={this.props.documentSelectedFromList}
                        />)
                    })}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({auth,cloudStorage}) => {
    return {
        documentsList: cloudStorage.documentsList,
        token: auth.token,
        userId: auth.userId
    }
};

const mapDispatchToProps = dispatch => {
    return {
        asyncOperationStarted: () => dispatch(actions.asyncOperationStarted()),
        asyncOperationEnded: () => dispatch(actions.asyncOperationEnded()),
        requestFetchDocumentsFromDatabaseSucceed: (documentsList) =>
            dispatch(cloudActions.requestFetchDocumentsFromDatabaseSucceed(documentsList)),
        deleteDocumentFromDatabaseSucceed: (id) =>
            dispatch(cloudActions.deleteDocumentFromDatabaseSucceed(id)),
        documentSelectedFromList: (document) => dispatch(cloudActions.updateCurrentDocument(document))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsComponent);
