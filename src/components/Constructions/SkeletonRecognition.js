import /*React,*/ {Component} from 'react';
import * as ActionTypes from "../../store/actionTypes";
import { connect } from 'react-redux';

class SkeletonRecognition extends Component {
    componentDidMount() {
        this.props.applySkeletonRecognition();
    }
    render() {
        return null;
    }
}

const mapStateToProps = state => {
    return {
        layers: state.layers,
        stage: state.app.stage
    }
};

const mapDispatchToProps = dispatch => {
    return {
        applySkeletonRecognition: () => dispatch({type: ActionTypes.SKELETON_RECOGNITION_URI})
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(SkeletonRecognition);
