/**
 * Created by alexanderbol on 17/04/2017.
 */

import React, {Component} from 'react';
import ModalPopup from "../../UI/ModalPopup/ModalPopup";
import LayerEditForm from "../LayerEditForm/LayerEditForm";
import styles from './LayerListElement.module.css';

class LayerListElement extends Component {
    componentDidUpdate() {
        if (document.activeElement.nodeName === "CANVAS")
            return;
        let elem = this.refs.layerName;
        if (this.props.layer.affected) {
            elem.focus();
        }
    }

    rgba(hex, opacity) {
        let r, g, b, percent;
        if (hex) {
            hex = hex.replace('#', '');
            r = parseInt(hex.substring(0, 2), 16);
            g = parseInt(hex.substring(2, 4), 16);
            b = parseInt(hex.substring(4, 6), 16);
            percent = opacity;
        }
        else {
            r = 147;
            g = 128;
            b = 108;
            percent = 0;
        }
        let result = `rgba(${r},${g},${b},${percent / 100})`;

        return result;
    }

    render() {
        // let style = this.props.layer.displayed ?
        //     styleSheet.displayed : styleSheet.undisplayed;

        let displayed = this.props.layer.displayed ? "Layer-displayed" : "Layer-undisplayed";
        let color = displayed ? this.rgba(this.props.layer.color, 100) : this.rgba();
        let bgcolor = displayed ? this.rgba(this.props.layer.color, 30) : this.rgba();
        let alpha = this.props.layer.affected ? 1 : 0;
        let layerNameOpacity = this.props.layer.shapes.length === 0 ? 0.6 : 1.0;
        return [
            <li key={1}
                className={styles.Layer}
                onClick={this.props.onLayerClicked}
                onDoubleClick={this.props.onLayerDoubleClicked}>

                <div className={styles.LayerSelectionBox}
                     onClick={this.props.onAffectedBoxClicked}
                >
                    <h4 className={styles.LayerSelectionMark}
                        style={{opacity: alpha, color: color}}>
                        ✓
                    </h4>
                </div>

                <div className={styles.LayerNameBox}
                     style={{backgroundColor: bgcolor, opacity: layerNameOpacity}}>
                    <h4 ref="layerName"
                        title={this.props.layer.name}
                        tabIndex='1'
                    >
                        {this.props.layer.name}
                    </h4>
                </div>

            </li>,

            <ModalPopup
                key={2}
                showPopup={this.props.layer.edited}
                closePopup={this.props.onEscapeLayerEditForm}
            >
                <LayerEditForm
                    layer={this.props.layer}
                    onSubmitLayerEditForm={this.props.onSubmitLayerEditForm}
                    onEscapeLayerEditForm={this.props.onEscapeLayerEditForm}
                />
            </ModalPopup>
        ]
    }
}

export default LayerListElement;
