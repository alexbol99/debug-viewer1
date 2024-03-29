import {Component, Fragment} from 'react';
// import Utils from "../utils";

class StageComponent extends Component {
    // shouldComponentUpdate useless because always returns "true",
    // Don't know why, maybe because of children?
    // ----------------------------------------------------------
    // shouldComponentUpdate(nextProps, nextState) {
    //     if (Utils.is_equal(this.props, nextProps)) {
    //         return false;
    //     }
    //     return true;
    // }

    componentDidUpdate() {
        if (this.props.stage.canvas && this.props.stage.canvas.getContext('2d')) {

            let origin = this.props.stage.origin;
            let zoomFactor = this.props.stage.zoomFactor*this.props.stage.resolution;
            this.props.stage.setTransform(origin.x, origin.y, zoomFactor, -zoomFactor);

            this.props.stage.update();
        }
    }

    componentWillUnmount() {
        this.props.onStageUnmounted();
    }

    render() {
        return (
            <Fragment>
                {this.props.children}
            </Fragment>
        )
    }
}

export default StageComponent;