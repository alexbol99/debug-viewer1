/**
 * Created by alexanderbol on 13/04/2017.
 */
import styles from './LayerEditForm.module.css';

const LayerEditForm = (props) => {
    let onSubmitLayerEditForm = (ev) => {
        if (!ev)
            return false;
        ev.stopPropagation();
        ev.preventDefault();
        let name = ev.currentTarget[0].value;
        let title = ev.currentTarget[1].value;
        let newLayer = Object.assign({}, props.layer, {
            name: name,
            title: title
        });
        props.onSubmitLayerEditForm(newLayer);
        return false;
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

    return (
        <form className={styles["Layer-edit-form"]}
              id="layerEditForm"
              action=""
              onSubmit={onSubmitLayerEditForm}
              onMouseMove={onMouseMoveHandler}
        >
            <article>
            <label>Name:</label>
            <input type="text" id="layer-name" name="layerName" defaultValue={props.layer.name}
                   onClick={setFocus}  />
            </article>
            <article>
            <label>Description:</label>
            <textarea id="layer-title" name="layerTitle" cols="70" rows="3" defaultValue={props.layer.title}
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
