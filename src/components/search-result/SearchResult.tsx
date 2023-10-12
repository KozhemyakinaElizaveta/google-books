import { getSearchResults } from '../../services/store';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import Banner from '../banner/Banner';
import styles from './SearchResult.module.css';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useState } from 'react';
import { CLEAR_RESULTS, SEARCH_PARAMETERS, getSearch, selectBook } from '../../services/actions';
import { API_KEY } from '../../utils/books-api';
import BooksList from '../books-list/BooksList';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchResult() {
    const [category, setCategory] = useState('');
    const [sort, setSort] = useState('relevance');

    const dispatch = useAppDispatch();
    const navigate = useNavigate()
    const location = useLocation()

    const { totalItems } = useAppSelector(getSearchResults);
    const { query } = useAppSelector(getSearchResults);

    const handleChange1 = (event: SelectChangeEvent) => {
        dispatch({
            type: CLEAR_RESULTS,
            results: [],
            totalItems: 0,
        })
        setCategory(event.target.value as string);
        if (query !== '' && category !== '') {
            const options = {
                key: API_KEY,
                q: query,
                filter: category,
                orderBy: sort,
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
    };

    const handleChange2 = (event: SelectChangeEvent) => {
        dispatch({
            type: CLEAR_RESULTS,
            results: [],
            totalItems: 0,
        })
        setSort(event.target.value as string);
        if (query !== '') {
            if (category == '') {
                const options = {
                    key: API_KEY,
                    q: query,
                    orderBy: sort,
                    maxResults: 30,
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
    };

    const openModal = (book: any, key: string) => {
        dispatch(selectBook(book));
        navigate(`/books/${book.id}`, { state: { background: location } })
    }

    return(
        <div className={styles.container}>
            <Banner/>
            <div className={styles.main}>
                {query && 
                <>
                    <section className={styles.filter}>
                        <div className={styles.text1}>FILTER</div>
                        <div className={styles.text2}>{totalItems} results</div>
                        <FormControl sx={{ width: 140}} size="small">
                            <InputLabel id="demo-simple-select-label">Category</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={category}
                                label="Category"
                                onChange={handleChange1}
                                sx={{ color: '#FFF'}}
                            >
                                <MenuItem value={'partial'}>partial</MenuItem>
                                <MenuItem value={'full'}>full</MenuItem>
                                <MenuItem value={'free-ebooks'}>free-ebooks</MenuItem>
                                <MenuItem value={'paid-ebooks'}>paid-ebooks</MenuItem>
                                <MenuItem value={'ebooks'}>ebooks</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl sx={{ width: 140, marginLeft: 5}} size="small">
                            <InputLabel id="demo-simple-select-label">Sort</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                defaultValue={sort}
                                id="demo-simple-select"
                                value={sort}
                                label="Sort"
                                onChange={handleChange2}
                                sx={{ color: '#FFF'}}
                            >
                                <MenuItem value={'relevance'}>relevance</MenuItem>
                                <MenuItem value={'newest'}>newest</MenuItem>
                            </Select>
                        </FormControl>
                    </section>
                    <BooksList
                        onClick = {openModal}
                        category={category}
                        sort={sort}
                    />
                </>}
            </div>
        </div>
    )
}

export default SearchResult;