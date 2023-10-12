import { Link } from 'react-router-dom';
import styles from '../components/app/App.module.css';
export const NotFound404 = () => {
    return (
        <div className={styles.not_found}>
            <div>
                Здесь ничего нет
                <br />
                <Link to='/'>Перейти на главную страницу</Link>
            </div>
        </div>
    );
}; 