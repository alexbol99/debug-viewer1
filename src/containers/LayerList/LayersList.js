/**
 * Created by alexanderbol on 17/04/2017.
 */

import React, {Component} from 'react';
import LayerListToolbar from "../../components/LayersList/LayerListToolbar/LayerListToolbar";
import LayerListElement from '../../components/LayersList/LayerListElement/LayerListElement';
import * as ActionTypes from '../../store/action-types';
import { Layers } from '../../models/layers';

import styles from './LayersList.module.css';

class LayersList extends Component {
    constructor(param) {
        super();
        this.height = 0;
        this.dispatch = param.dispatch;
    }

    onLayerListClicked = () => {
        this.dispatch({
            type: ActionTypes.LAYER_LIST_PANEL_PRESSED
        });
    };

    onLayerClicked = (layer) => {
        this.dispatch({
            type: ActionTypes.TOGGLE_DISPLAY_LAYER_PRESSED,
            layer: layer
        });
    };

    onLayerDoubleClicked = (layer) => {
        // this.dispatch({
        //     type: ActionTypes.OPEN_LAYER_EDIT_FORM_PRESSED,
        //     layer: layer
        // });
    };

    onSubmitLayerEditForm = (newLayer) => {
        this.dispatch({
            type: ActionTypes.SUBMIT_LAYER_EDIT_FORM_PRESSED,
            newLayer: newLayer
        });
    };

    onEscapeLayerEditForm = () => {
        this.dispatch({
            type: ActionTypes.ESCAPE_LAYER_EDIT_FORM_PRESSED
        });
    };

    onAffectedBoxClicked = (event, layer) => {
        event.stopPropagation();
        this.dispatch({
            type: ActionTypes.TOGGLE_AFFECTED_LAYER_PRESSED,
            layer: layer
        });
    };

    onAddLayerSelected = () => {
        let layer = Layers.newLayer(this.props.stage, this.props.layers);

        this.dispatch({
            type: ActionTypes.ADD_LAYER_PRESSED,
            stage: this.props.stage,
            layer: layer
        })
    };

    onEditLayerSelected = () => {
        let layer = Layers.getAffected(this.props.layers);
        if (!layer) return;

        this.dispatch({
            type: ActionTypes.OPEN_LAYER_EDIT_FORM_PRESSED,
            layer: layer
        });
    };

    onDeleteLayerSelected = () => {
        let layer = Layers.getAffected(this.props.layers);
        if (!layer) return;

        this.dispatch({
            type: ActionTypes.DELETE_LAYER_BUTTON_PRESSED,
            layers: this.props.layers,
            layer: layer
        });
    };

    onSortLayersSelected = () => {
        this.dispatch({
            type: ActionTypes.SORT_LAYERS_BUTTON_PRESSED,
            layers: this.props.layers
        });
    };

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
                    this.dispatch({
                        type: ActionTypes.LAYERS_LIST_ARROW_DOWN_PRESSED
                    });
                    break;
                case "ArrowLeft":
                case "ArrowUp":
                    this.dispatch({
                        type: ActionTypes.LAYERS_LIST_ARROW_UP_PRESSED
                    });
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

    componentDidMount() {
        // Keyboard event
        // var _keydown = _.throttle(this.keydown, 100);
        document.addEventListener('keydown', this.handleKeyDown);
        // var _keyup = _.throttle(this.keyup, 500);
        // document.addEventListener('keyup', this.handleKeyUp);
    }

    componentDidUpdate() {
        this.height = this.refs.layersComponent.clientHeight;
        // let container = this.refs.watchContainer;
        // let parentHeight = container.parentElement.clientHeight;
        // container.style.maxHeight = 0.7*parentHeight;
    }

    render() {
        return (
            <div className={styles["App-layers"]}
                 ref="layersComponent"
                 onClick={this.onLayerListClicked}
            >
                {/*<h5>Layers</h5>*/}
                <LayerListToolbar
                    onAddLayerButtonClicked={this.onAddLayerSelected}
                    onEditLayerButtonClicked={this.onEditLayerSelected}
                    onDeleteLayerButtonClicked={this.onDeleteLayerSelected}
                    onSortLayersButtonClicked={this.onSortLayersSelected}
                />
                <ul id="layersList"
                    style={{maxHeight:0.82*(this.height-40),padding:0,overflow:'auto'}}>
                { this.props.layers.map((layer) =>
                    <LayerListElement
                        onLayerClicked={() => this.onLayerClicked(layer)}
                        onLayerDoubleClicked={() => this.onLayerDoubleClicked(layer)}
                        onAffectedBoxClicked={(event) => this.onAffectedBoxClicked(event, layer)}
                        onSubmitLayerEditForm={this.onSubmitLayerEditForm}
                        onEscapeLayerEditForm={this.onEscapeLayerEditForm}
                        key={layer.name}
                        layer={layer}
                    />)
                }
                </ul>
                {/*{addLayer}*/}
            </div>
        )

    }
}

export default LayersList;