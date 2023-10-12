import RoutesContainer from '../../pages/routes-container';
import SearchBooks from '../search-books/SearchBooks';
import SearchResult from '../search-result/SearchResult';
import styles from './App.module.css';

function App() {

  return (
    <div className={styles.app}> 
    <>
      <SearchBooks/>
      <RoutesContainer/>
    </>
    </div>
  );
}

export default App;
