import React from 'react';
import classes from "./DocumentComponentCell.module.css";
import {Link} from "react-router-dom";

const documentComponentCell = ({id, document}) => {
    return (
        <div className={classes.DocumentComponentCell}>
            <Link to={"/documents/" + id}>
                <div>
                    <img src={document.dataURL} width="400px"/>
                    <div>
                        <h4>{document.name}</h4>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export default documentComponentCell;