/**
 * Created by alexanderbol on 13/04/2017.
 */
import styles from './LayerEditForm.module.css';
import {useEffect, useRef} from "react";

const LayerEditForm = (props) => {
    const layerNameRef = useRef();
    const layerTitleRef = useRef();

    let onSubmitLayerEditForm = (ev) => {
        if (!ev)
            return;
        ev.stopPropagation();
        ev.preventDefault();
        const name = layerNameRef.current.value.trim();
        let title = layerTitleRef.current.value.trim();
        let newLayer = { ...props.layer, name: name, title: title};
        props.onSubmitLayerEditForm(newLayer);
        return;
    };

    let setFocus = (ev) => {
        ev.stopPropagation();
        ev.target.focus();
    };

    let onCancelLayerEditForm = (ev) => {
        props.onEscapeLayerEditForm();
    };

    let onMouseMoveHandler = (ev) => {
        ev.stopPropagation();
    };

    useEffect( () => {
        layerNameRef.current.focus();
    },[layerNameRef])

    return (
        <form className={styles["Layer-edit-form"]}
              onSubmit={onSubmitLayerEditForm}
              onMouseMove={onMouseMoveHandler}
        >
            <article>
                <label htmlFor="layerName">Name:</label>
                <input type="text" id="layerName" ref={layerNameRef} defaultValue={props.layer.name}
                       onClick={setFocus}/>
            </article>
            <article>

                <textarea id="layerTitle" ref={layerTitleRef} cols="70" rows="3" defaultValue={props.layer.title}
                          onClick={setFocus}>
            </textarea>
            </article>
            <input type="submit" style={{display:"none"}}/>
            <button onClick={onCancelLayerEditForm}>Cancel</button>
            <button onClick={(ev) => onSubmitLayerEditForm(ev.target.parent)}>OK</button>
        </form>
    )
};

export default LayerEditForm;
