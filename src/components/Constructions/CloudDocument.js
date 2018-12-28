import /*React,*/ {Component} from 'react';
import { connect } from 'react-redux';
import * as cloudActions from '../../store/actions/cloudStorageActions';

class CloudDocument extends Component {
    state={
        done:false
    };

    componentDidUpdate() {
        if (this.props.stage && !this.state.done) {
            this.props.fetchDocumentFromDatabase(this.props.stage, this.props.match.params.id);
            this.setState({done:true});
        }
    }
    render() {
        return null;
    }
}

const mapStateToProps = ({app}) => {
    return {
        stage: app.stage,
    }
};

const mapDispatchToProps = dispatch => {
    return {
        fetchDocumentFromDatabase: (stage, id) => dispatch(cloudActions.fetchDocumentFromDatabase(stage, id)),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(CloudDocument);
