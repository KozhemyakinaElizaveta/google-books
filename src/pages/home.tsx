import Banner from "../components/banner/Banner";
import SearchResult from "../components/search-result/SearchResult";
import { getSearchResults } from "../services/store";
import { useAppSelector } from "../utils/hooks";
import styles from './home.module.css';
import AutoStoriesIcon from '@mui/icons-material/AutoStories';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';

export function HomePage() {
    const { query } = useAppSelector(getSearchResults);

    var text = 'OKS ';
    for(var i=0; i<6; i++)
    {
        text += 'ALL BOOKS ';
    }

    return (
        <main>
            {!query ? <div className={styles.container}>
                <Banner/>
                <div className={styles.box}>
                    <div className={styles.go1}>
                        <AutoStoriesIcon color='error' sx={{ fontSize: 260 }}/>
                        <div className={styles.text}>SEARCH BOOKS</div>
                    </div>
                    <div className={styles.go2}>
                        <ArrowUpwardIcon color='secondary' sx={{ fontSize: 300 }}/>
                    </div>
                </div>
                <div className={styles.slogan}>{text}</div>
            </div>
            : <SearchResult/>}
        </main>
    )
}