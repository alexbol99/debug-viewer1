import classes from "./DocumentComponentCell.module.css";
import {Link} from "react-router-dom";

const documentComponentCell = ({id, document, deleteDocumentFromDatabase, documentSelectedFromList}) => {
    const deleteDocumentButtonClicked = (event) => {
        event.stopPropagation();
        deleteDocumentFromDatabase(id);
    };

    const onClick = () => {
        documentSelectedFromList({
            id: id,
            name: document.name,
            owner: document.owner,
            lastUpdated: document.lastUpdated
        });
    };

    return (
        <div className={classes.DocumentComponentCell}>
            <Link to={"/documents/" + id} onClick={onClick} >
                <div>
                    <img src={document.dataURL} alt={document.name} width="400px"/>
                </div>
            </Link>
            <div className={classes.DocumentComponentCellBottom}>
                <div>
                    <h4>{document.name}</h4>
                    <h6>Last updated: {document.lastUpdated}</h6>
                </div>
                <button onClick={deleteDocumentButtonClicked}>Delete</button>
            </div>
        </div>
    );
};

export default documentComponentCell;