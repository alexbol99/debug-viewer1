/**
 * Created by alexanderbol on 17/04/2017.
 */
import Button from "../../UI/Button/Button";

import styles from './LayerListToolbar.module.css';
import '@fortawesome/fontawesome-free/css/all.css';

const LayerListToolbar = (props) => {
    return (
        <div className={styles["Layer-list-toolbar"]}>
            <Button type="trigger" title="Edit selected layer's name and info" iconName='pencil-alt'
                    onClick={props.onEditLayerButtonClicked}
            />

            <Button type="trigger" title="Delete selected layer" iconName='trash-alt'
                    onClick={props.onDeleteLayerButtonClicked}
            />


            {/*<button title="Add layer" onClick={props.onAddLayerButtonClicked}>*/}
            {/*    <FontAwesome*/}
            {/*        name='plus'*/}
            {/*        size='2x'*/}
            {/*        style={{color: "grey"}}*/}
            {/*    />*/}
            {/*</button>*/}
        </div>
    )
};

export default LayerListToolbar;
