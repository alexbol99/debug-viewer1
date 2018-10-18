import /*React,*/ {Component} from 'react';
import * as ActionTypes from "../../actions/action-types";

class SkeletonRecognition extends Component {
    componentDidMount() {
        this.props.dispatch({
            type: ActionTypes.SKELETON_RECOGNITION_URI
        });
    }
    render() {
        return null;
    }
}

export default SkeletonRecognition;