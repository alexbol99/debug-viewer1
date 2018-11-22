import React, {Component} from 'react';
import classes from './DocumentName.module.css';

class DocumentName extends Component {
    state = {
        name: ""
    };

    handleChange = (ev) => {
        let name = ev.target.value;
        this.setState({name: name});
        this.props.updateDocumentName(name);
    };

    static getDerivedStateFromProps(nextProps, prevState){
        return {
            name : nextProps.name
        };
    }

    render() {
        return (
            <div className={classes.DocumentName}>
                <input type="text" placeholder="Document Name"  value={this.state.name} onChange={this.handleChange} />
            </div>
        );
    }
}

export default DocumentName;