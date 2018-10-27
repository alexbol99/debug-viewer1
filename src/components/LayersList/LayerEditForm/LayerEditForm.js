/**
 * Created by alexanderbol on 13/04/2017.
 */

import React from 'react';
import styles from './LayerEditForm.module.css';

const LayerEditForm = (props) => {
    let onSubmitLayerEditForm = (ev) => {
        ev.stopPropagation();
        ev.preventDefault();
        let form = ev.target.parentElement;
        let newLayer = Object.assign({}, props.layer, {
            name: form.layerName.value,
            title: form.layerTitle.value
        });
        props.onSubmitLayerEditForm(newLayer);
        return false;
    };

    let setFocus = (ev) => {
        ev.stopPropagation();
        ev.target.focus();
    };

    let onCancelLayerEditForm = () => {
        props.onEscapeLayerEditForm();
    };

    return (
        <form className={styles["Layer-edit-form"]}
              id="layerEditForm"
              onSubmit={onSubmitLayerEditForm}
        >
            <label>Layer name:</label><br/>
            <input type="text" id="layer-name" name="layerName" size="80" defaultValue={props.layer.name}
                   onClick={setFocus}/><br/>
            <label>Layer info:</label><br/>
            <textarea id="layer-title" name="layerTitle" cols="78" rows="3" defaultValue={props.layer.title}
                      onClick={setFocus}></textarea><br/>
            <button onClick={onCancelLayerEditForm}>Cancel</button>
            <button onClick={onSubmitLayerEditForm}>OK</button>
        </form>
    )
};

export default LayerEditForm;