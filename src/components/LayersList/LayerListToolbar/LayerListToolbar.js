/**
 * Created by alexanderbol on 17/04/2017.
 */
import React from 'react';
import FontAwesome from 'react-fontawesome';

import styles from './LayerListToolbar.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const LayerListToolbar = (props) => {
    return (
        <div className={styles["Layer-list-toolbar"]}>
            <button title="Add layer" onClick={props.onAddLayerButtonClicked}>
                <FontAwesome
                    name='plus'
                    size='2x'
                    style={{color: "grey"}}
                />
            </button>
            <button title="Edit selected layer's name and info" onClick={props.onEditLayerButtonClicked}>
                <FontAwesome
                    name='pencil-alt'
                    size='2x'
                    style={{color: "grey"}}
                />
            </button>
            <button title="Delete selected layer" onClick={props.onDeleteLayerButtonClicked}>
                <FontAwesome
                    name='times'
                    size='2x'
                    style={{color: "grey"}}
                />
            </button>
            <button title="Sort layer list" onClick={props.onSortLayersButtonClicked}>
                <FontAwesome
                    name='sort-alpha-down'
                    size='2x'
                    style={{color: "grey"}}
                />
            </button>
        </div>
    )
};

export default LayerListToolbar;