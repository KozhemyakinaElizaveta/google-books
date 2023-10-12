import styles from './book-details.module.css';
import FindReplaceIcon from '@mui/icons-material/FindReplace';
import { getBookInfo } from "../services/store";
import { useAppSelector } from "../utils/hooks";
import BookDetails from "../components/book-info/BookDetails";

export function BookPage() {
    const isPage = true;

    const { book } = useAppSelector(getBookInfo);

    return(
        book ? <div className={styles.container}>
            <div className={styles.main}>
                <BookDetails fullPage={isPage}/>
            </div>
        </div> :
        <div className={styles.err}>
            <FindReplaceIcon sx={{ fontSize: 100, marginBottom: 5 }}/>
            <div>Nothing found</div>
        </div>
    )
}

export default BookPage;