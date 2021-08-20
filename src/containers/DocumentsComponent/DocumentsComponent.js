import {Component} from 'react';
import {connect} from 'react-redux';
import * as cloudActions from '../../store/actions/cloudStorageActions';
import classes from './DocumentsComponent.module.css';
import DocumentComponentCell from '../../components/Documents/DocumentComponentCell';

class DocumentsComponent extends Component {
    state = {
        updated: false
    };

    componentDidMount = () => {
        if (!this.props.token) return;
        // if (this.state.updated) return;
        this.props.fetchDocumentsFromDatabase(this.props.token, this.props.userId);

        // if (this.props.documentsList.length === 0) {
        //     this.props.asyncOperationStarted();
        // }

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
                            deleteDocumentFromDatabase={this.props.deleteDocumentFromDatabase}
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
        fetchDocumentsFromDatabase: (token, userId) => dispatch(cloudActions.fetchDocumentsFromDatabase(token, userId)),
        deleteDocumentFromDatabase: (id) => dispatch(cloudActions.deleteDocumentFromDatabase(id)),
        documentSelectedFromList: (document) => dispatch(cloudActions.updateCurrentDocument(document))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DocumentsComponent);
