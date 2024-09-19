import styles from './ErrorMessage.module.css';

export default ({ message }) => {
    return (
        <div className={styles.errorMessage}>
            <div className={styles.content}>
                <div className={styles.message}>
                    <div className={styles.iconContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={styles.text}>
                        <span className={styles.title}>
                            Failed
                        </span>
                        <p className={`${styles.description} secondary_text`}>
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
