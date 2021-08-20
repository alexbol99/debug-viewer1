import {Component} from 'react';
import { withRouter } from 'react-router-dom';
import Button from '../../../components/UI/Button/Button';
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

    shareDocument = () => {
        if (window.navigator.share) {
            window.navigator.share({
                title: 'Share document',
                text: `${this.props.username} shared a document with you.
Click on the link below to open it:`,
                url: window.location.href,
            }).then( (resp) => {
                    console.log("shared")
                })
                .catch( (error) => {})
        }
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
                {window.navigator.share ?
                    <Button type="trigger" mobileOnly title="Share document" iconName='share-alt' onClick={this.shareDocument}/> :
                    null
                }
            </div>
        );
    }
}

export default withRouter(DocumentName);