import { useEffect, useState } from 'react';
import styles from './SearchBooks.module.css'
import { SEARCH_PARAMETERS, getSearch } from '../../services/actions';
import { useAppDispatch, useAppSelector } from '../../utils/hooks';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import IconButton from '@mui/material/IconButton';
import logo from '../../images/logo.png';
import { API_KEY } from '../../utils/books-api';
import { getSearchResults } from '../../services/store';

function SearchBooks() {
  const [search, setSearch] = useState('')

  const dispatch = useAppDispatch();
  const { filter } = useAppSelector(getSearchResults);

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") {
      handleSuccess(e);
    }
  };

  const handleSuccess = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (search !== '') {
      const options = {
        key: API_KEY,
        q: search,
        orderBy: 'relevance',
        maxResults: 30,
        startIndex: 0,
        fields: 'totalItems,items(id,volumeInfo(title,authors,imageLinks,infoLink,publisher,publishedDate,description,pageCount,mainCategory,printType,language),saleInfo(buyLink))',
      }
      dispatch(getSearch(options));
      dispatch({
        type: SEARCH_PARAMETERS,
        query: search,
        filter: filter,
        sort: 'relevance'
      });
    } else {
      console.log('err')
    }
  }

  return (
      <div className={styles.container}>
        <div className={styles.header}>
          <img src={logo} className={styles.logo}></img>
          <div className={styles.box}>
            <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '50%', justifyContent: 'center', borderRadius: 60, backgroundColor: '#F4CE47', marginRight: 30}}>
              <InputBase
                sx={{ ml: 2, flex: 1, color: '#2A2C2E'}}
                placeholder="Search books"
                inputProps={{ 'aria-label': 'search books' }}
                onChange={e => setSearch(e.target.value)}
                onKeyDown={handleKeyDown}
              />
              <IconButton type="button" sx={{ p: '10px', color: '#2A2C2E' }} aria-label="search" onClick={handleSuccess}>
                <SearchIcon />
              </IconButton>
            </Paper>
          </div>
      </div>
      </div>
  )
}

export default SearchBooks;