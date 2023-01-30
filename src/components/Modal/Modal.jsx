import { Component } from "react";
import {createPortal} from "react-dom";
import PropTypes from 'prop-types';
import styles from "./modal.module.css";

const modalRoot = document.getElementById("modal-root");

class Modal extends Component {

    componentDidMount(){
        document.addEventListener("keydown", this.close)
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.close)
    }

    close = ({target, currentTarget, code}) => {
        if(target === currentTarget || code === "Escape") {
            this.props.closeModal()
        }
    }

    render(){
        const {close} = this;
        const {children} = this.props;

        return createPortal(
            <div className={styles.overlay} onClick={close}>
                <div className={styles.modal}>
                    {children}
                </div>
            </div>,
            modalRoot
        )
    }
}

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};