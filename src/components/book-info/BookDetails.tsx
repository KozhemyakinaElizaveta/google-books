import styles from './BookDetails.module.css';

import { FunctionComponent, useMemo } from "react";
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAppSelector } from '../../utils/hooks';
import { getSearchResults } from '../../services/store';
import Button from '@mui/material/Button';

type TDetails = {
    fullPage: boolean,
}

const BookDetails: FunctionComponent<TDetails> = ({fullPage}) =>  {
    const { id } = useParams();
    const navigate = useNavigate()
    const { results } = useAppSelector(getSearchResults);

    const book = useMemo(() => {
        return results.find(o => o.id === id)
    }, [results, id])

    if (!book) return null;

    const {title, authors, imageLinks, publisher, publishedDate, description, pageCount, mainCategory, printType, language, infoLink} = book?.volumeInfo;

    const openBook = (e: React.SyntheticEvent) => {
        e.preventDefault();
        window.location.href = infoLink;
        //navigate(`/books/${book.id}`)
    }

    const openBuy = (e: React.SyntheticEvent) => {
        e.preventDefault();
        window.location.href = book.saleInfo.buyLink;
    }

    return(
        book && (<>
            <div className={styles.main}>
                <img className={styles.image} src={imageLinks.thumbnail} alt={title}></img>
                <div className={styles.right}>
                    <div className={styles.contain}>
                        <span className={styles.title}>{title}</span>
                        <span className={styles.author}>{authors && authors.join(", ")}</span>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.name}>
                            <div>Category</div>
                            <div>Publish date</div>
                            <div>Publisher</div>
                            <div>Language</div>
                            <div>Pages</div>
                            <div>Type</div>
                        </div>
                        <div className={styles.items}>
                            <span className={styles.value}>{(mainCategory) ? mainCategory : '-'}</span>
                            <span className={styles.value}>{(publishedDate) ? publishedDate : '-'}</span>
                            <span className={styles.value}>{(publisher) ? publisher : '-'}</span>
                            <span className={styles.value}>{(language) ? language : '-'}</span>
                            <span className={styles.value}>{(pageCount) ? pageCount : '-'}</span>
                            <span className={styles.value}>{(printType) ? printType : '-'}</span>
                        </div>
                    </div>
                    <div className={styles.buttons}>
                        <Button color="error" variant="contained" size="medium" onClick={openBuy}>BUY NOW</Button>
                        <Button color="error" variant="outlined" size="medium" onClick={openBook}>SAVE</Button>
                    </div>
                </div>
                <div className={styles.description}>
                    <span className={styles.head}>PLOT SUMMERY</span>
                    <div className={styles.plot}>{ ((description)?.length > 750, !fullPage) ? (((description)?.substring(0,750-3)) + '...') : description }</div>
                    {!fullPage && (<Link to={`/books/${book.id}`}><div className={styles.more}>READ PREVIEW</div></Link>)}
                </div>
            </div>
        </>)
    )
}

export default BookDetails;