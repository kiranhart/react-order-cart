import ReactDOM from 'react-dom';
import classes from './Modal.module.css';

const Backdrop = (props) => {
    return <div className={classes.backdrop} onClick={props.onHide}></div>;
};

const ModalOverlay = (props) => {
    return <div className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>;
};

const portalDiv = document.getElementById('overlays');

const Modal = (props) => {
    return <>
        {ReactDOM.createPortal(<Backdrop onHide={props.onHide} />, portalDiv)}
        {ReactDOM.createPortal(<ModalOverlay>{props.children}</ModalOverlay>, portalDiv)}
    </>; 
};

export default Modal;
