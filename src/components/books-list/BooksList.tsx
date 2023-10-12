import { FunctionComponent, useState } from 'react';
import styles from './BooksList.module.css';
import { SEARCH_PARAMETERS, TSearchResult, getSearch } from '../../services/actions';
import BookCard from '../book-card/BookCard';
import Button from '@mui/material/Button';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import { getSearchResults } from '../../services/store';
import { API_KEY } from '../../utils/books-api';
import FindReplaceIcon from '@mui/icons-material/FindReplace';

type TItems = {
    onClick: (book: any, key: string) => void,
    category: string,
    sort: string,
}

const BooksList: FunctionComponent<TItems> = ({ onClick, category, sort}) => {
    const [visible, setVisible] = useState(30);
    const [indexStart, setStart] = useState(30)
    const dispatch = useAppDispatch();

    const { query } = useAppSelector(getSearchResults);
    const { results } = useAppSelector(getSearchResults);

    const showMore = () => {
        setStart(indexStart + 30);

        if (query !== '' && category !== '') {
            const options = {
                key: API_KEY,
                q: query,
                filter: category,
                orderBy: sort,
                startIndex: indexStart,
                maxResults: 30,
                fields: 'totalItems,items(id,volumeInfo(title,authors,imageLinks,infoLink,publisher,publishedDate,description,pageCount,mainCategory,printType,language),saleInfo(buyLink))',
            }
            dispatch(getSearch(options));
            dispatch({
                type: SEARCH_PARAMETERS,
                query: query,
                filter: category,
                sort: sort
            });
        } else {
        console.log('err')
        }

        if (query !== '') {
            if (category == '') {
                const options = {
                    key: API_KEY,
                    q: query,
                    orderBy: sort,
                    maxResults: 30,
                    startIndex: indexStart,
                    fields: 'totalItems,items(id,volumeInfo(title,authors,imageLinks,infoLink,publisher,publishedDate,description,pageCount,mainCategory,printType,language),saleInfo(buyLink))',
                }
                dispatch(getSearch(options));
            }
            else {
                const options = {
                    key: API_KEY,
                    q: query,
                    filter: category,
                    orderBy: sort,
                    maxResults: 30,
                    startIndex: indexStart,
                    fields: 'totalItems,items(id,volumeInfo(title,authors,imageLinks,infoLink,publisher,publishedDate,description,pageCount,mainCategory,printType,language),saleInfo(buyLink))',
                }
                dispatch(getSearch(options));
            }
            dispatch({
                type: SEARCH_PARAMETERS,
                query: query,
                filter: category,
                sort: sort
            });
        } else {
        console.log('err')
        }

        setVisible((prevItem) => prevItem + 30);
    }

    return(
        results.length > 0 ? <div className={styles.box}>
            <div className={styles.container}>
                {results.slice(0, visible).map(book => (
                    <BookCard key={book.id} about={book} onClick={onClick}/>
                ))}
            </div>
            {results.length > 29 && <Button className={styles.button} color="error" variant="text" size="medium" onClick={showMore}>LOAD MORE</Button>}
        </div> :
        <div className={styles.err}>
            <FindReplaceIcon sx={{ fontSize: 100, marginBottom: 5 }}/>
            <div>Nothing found</div>
        </div>
        
    )
}

export default BooksList;