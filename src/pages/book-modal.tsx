import { useNavigate } from "react-router-dom";
import Modal from "../components/modal/Modal";
import { useAppDispatch } from "../utils/hooks";
import { deleteBook } from "../services/actions";
import BookDetails from "../components/book-info/BookDetails";


export function BookModal() {
    const isPage = false;
    const navigate = useNavigate()
    const dispatch = useAppDispatch();

    const onModalClose = () => {
        navigate(-1)
        dispatch(deleteBook());
    }

    return (
        <Modal onClose = {onModalClose} title = 'BOOK INFO'>
            <BookDetails fullPage={false}/>
        </Modal>
    )
}