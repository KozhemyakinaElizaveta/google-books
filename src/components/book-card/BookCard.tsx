import { FunctionComponent } from 'react';
import styles from './BookCard.module.css';
import Button from '@mui/material/Button';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

type TBookInfo = {
    about: any,
    onClick: (book: any, key: string) => void,
    key: string
}
const BookCard: FunctionComponent<TBookInfo> = ({about, onClick, key}) => {
    const name = about.volumeInfo.title

    const openBook = (e: React.SyntheticEvent) => {
        e.preventDefault();
        window.location.href = about.volumeInfo.infoLink;
    }

    const openPage = (e: React.SyntheticEvent) => {
        e.preventDefault();
        onClick(about, key)
    }

    const {imageLinks, authors} = about.volumeInfo;

    return(
        <div className={styles.main} key={key}>
            <img onClick={() => onClick(about, key)} className={styles.image} src={imageLinks.thumbnail} ></img>
            <div className={styles.description}>
                <span className={styles.text2}>{authors && authors.join(", ")}</span>
                <div className={styles.text1}>{ ((name).length > 40) ? (((name).substring(0,40-3)) + '...') : name }</div>
            </div>
            <div className={styles.buttons}>
                <Button color="success" variant="outlined" size="medium" startIcon={<ManageSearchOutlinedIcon />} onClick={openPage}>Info</Button>
                <Button color="error" variant="outlined" size="medium" startIcon={<FavoriteBorderIcon />} onClick={openBook}>Save</Button>
            </div>
        </div>
    )
}

export default BookCard;