import styles from './Banner.module.css';

function Banner() {
    return(
        <div className={styles.title}>
            <div className={styles.word1}>READING</div>
            <div className={styles.word2}>MAKES</div>
            <div className={styles.word3}>THE</div>
            <div className={styles.word4}>WORLD</div>
            <div className={styles.word5}>HUGE</div>
        </div>
    )
}

export default Banner;