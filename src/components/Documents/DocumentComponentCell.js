import React from 'react';
import classes from "./DocumentComponentCell.module.css";
import {Link} from "react-router-dom";

const documentComponentCell = ({id, document, deleteDocumentFromDatabase}) => {
    const deleteDocumentButtonClicked = (event) => {
        event.stopPropagation();
        deleteDocumentFromDatabase(id);
    };
    return (
        <div className={classes.DocumentComponentCell}>
            <Link to={"/documents/" + id}>
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