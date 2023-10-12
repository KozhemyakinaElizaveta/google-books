import ReactDOM from "react-dom";
import ModalOverlay from "./ModalOverlay";
import { PropsWithChildren, useEffect } from "react";
import styles from './Modal.module.css';
import CloseIcon from '@mui/icons-material/Close';

const modalRoot = document.getElementById("portal-root") as Element;
const ESC_KEYCODE = 27;

interface ModalProps {
    title: string;
    onClose: () => void;
}

type MakeOptional<Type, Key extends keyof Type> = Omit<Type, Key> & Partial<Pick<Type, Key>>;

type T1 = MakeOptional<ModalProps, 'title'>;

export const Modal: React.FC<PropsWithChildren<T1>> = ({ children, onClose, title}) => {
    const closeModal = () => {
        onClose();
    };
    
    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            event.keyCode === ESC_KEYCODE && onClose()
        };

        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    });

    return ReactDOM.createPortal(
    <>
        <ModalOverlay onClick ={closeModal}/>
        <div className={styles.modal_container}>
            <div className={styles.modal_content}>
                <div className={styles.button}>
                    {title &&<h2 className={styles.text}>{title}</h2>}
                    <div className={styles.icon}>
                        <CloseIcon sx={{ color: '#fff' }} fontSize="large" onClick={onClose}/>
                    </div>
                </div>
                {children}
            </div>
        </div>
    </>,
    modalRoot
    );
};

export default Modal;