import Modal from '../Modal';
import classes from './Spinner.module.css';

const spinner = () => {
    return (
        <Modal>
            <div className={classes.BackDrop} >
                <div className={classes.Loader}>Loading ...</div>
            </div>
        </Modal>
    );
};

export default spinner;