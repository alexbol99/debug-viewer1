/**
 * Created by alexanderbol on 17/04/2017.
 */

import {Component} from 'react';
import LayerListToolbar from "../../components/LayersList/LayerListToolbar/LayerListToolbar";
import LayerListElement from '../../components/LayersList/LayerListElement/LayerListElement';
import * as actions from '../../store/actions/layersActions';
import { connect } from 'react-redux';
import styles from './LayersList.module.css';

class LayersList extends Component {
    height = 0;

    handleKeyDown = (e) => {
        // e.stopPropagation();
        // e.preventDefault();

        if (e.target.parentElement.parentElement &&
            e.target.parentElement.parentElement.parentElement &&
            e.target.parentElement.parentElement.parentElement.id &&
            e.target.parentElement.parentElement.parentElement.id === "layersList") {


            switch (e.code) {
                case "ArrowRight":
                case "ArrowDown":
                    this.props.setAffectedNextLayer();
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    this.props.setAffectedPrevLayer();
                    break;
                /* tab does not work properly
            case "Tab":
                if (e.shiftKey) {
                    this.dispatch({
                        type: ActionTypes.LAYERS_LIST_ARROW_UP_PRESSED
                    });
                }
                else {
                    this.dispatch({
                        type: ActionTypes.LAYERS_LIST_ARROW_DOWN_PRESSED
                    });
                }
                break;
                */
                default:
                    break;
            }
        }

    };

    onLayerListClicked = () => {
        this.forceUpdate();
    };

    componentDidMount() {
        // Keyboard event
        // var _keydown = _.throttle(this.keydown, 100);
        document.addEventListener('keydown', this.handleKeyDown);
        // var _keyup = _.throttle(this.keyup, 500);
        // document.addEventListener('keyup', this.handleKeyUp);
    }

    componentDidUpdate() {
        this.height = this.refs.layersComponent.clientHeight;
    }

    render() {
        const style = this.props.showLayerList ? styles["App-layers-displayed"] : styles["App-layers"];
        return (
            <div className={style}
                 ref="layersComponent"
                 onClick={this.onLayerListClicked}
            >
                {/*<h5>Layers</h5>*/}
                <LayerListToolbar
                    // onAddLayerButtonClicked={() => this.props.onAddLayerButtonClicked(this.props.stage)}
                    onEditLayerButtonClicked={this.props.onEditLayerButtonClicked}
                    onDeleteLayerButtonClicked={this.props.onDeleteLayerButtonClicked}
                    onSortLayersButtonClicked={this.props.onSortLayersButtonClicked}
                />
                <ul id="layersList"
                    style={{maxHeight:0.82*(this.height-40)}}>
                { this.props.layers.map((layer) =>
                    <LayerListElement
                        key={layer.name}
                        layer={layer}
                        onLayerClicked={() => this.props.onLayerClicked(layer)}
                        onAffectedBoxClicked={(event) => this.props.onAffectedBoxClicked(event, layer)}
                        onSubmitLayerEditForm={this.props.onSubmitLayerEditForm}
                        onEscapeLayerEditForm={this.props.onEscapeLayerEditForm}
                    />)
                }
                </ul>
                {/*{addLayer}*/}
            </div>
        )

    }
}

const mapStateToProps = state => {
    return {
        layers: state.layers,
        stage: state.app.stage,
        showLayerList: state.app.showLayerList         // on mobile device
    }
};

const mapDispatchToProps = dispatch => {
    return {
        // onAddLayerButtonClicked: (stage) => dispatch(actions.addEmptyLayer(stage)),
        onEditLayerButtonClicked: () => dispatch(actions.openAffectedLayerEditForm()),
        onDeleteLayerButtonClicked: () => dispatch(actions.deleteAffectedLayer()),
        // onSortLayersButtonClicked: () => dispatch(actions.sortLayers()),
        onLayerClicked: (layer) => dispatch(actions.toggleDisplayLayer(layer)),
        onAffectedBoxClicked: (event, layer) => dispatch(actions.toggleAffectedLayer(event, layer)),
        onSubmitLayerEditForm: (newLayer) => dispatch(actions.updateLayer(newLayer)),
        onEscapeLayerEditForm: () => dispatch(actions.closeEditLayerForm()),
        setAffectedNextLayer: () => dispatch(actions.setAffectedNextLayer()),
        setAffectedPrevLayer: () => dispatch(actions.setAffectedPrevLayer())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(LayersList);

// export default LayersList;
