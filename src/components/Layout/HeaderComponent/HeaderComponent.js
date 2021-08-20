/**
 * Created by alexanderbol on 13/04/2017.
 */
import { withRouter } from 'react-router-dom';
import classes from './HeaderComponent.module.css';
// import Logo from './Logo/Logo';
// import Navigation from './Navigation/Navigation';

const HeaderComponent = (props) => {
    const style = props.location.pathname === "/documents" ?
        classes["App-header-documents-page"] :
        classes["App-header"];
    return (
        <header className={style}>
            <h2>Debug Viewer</h2>
        </header>
    )
};

export default withRouter(HeaderComponent);

/*
<header className={style}>
    <Logo />
    <Navigation isAuthenticated={props.isAuthenticated} />
    {props.isAuthenticated ? <span>Hello {props.username}</span> : null}
    {props.location.pathname === "/documents" ? <hr/> : null}
</header>
*/