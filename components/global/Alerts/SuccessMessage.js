import styles from './SuccessMessage.module.css';

export default ({ message }) => {
    return (
        <div className={styles.successMessage}>
            <div className={styles.content}>
                <div className={styles.message}>
                    <div className={styles.iconContainer}>
                        <svg xmlns="http://www.w3.org/2000/svg" className={styles.icon} viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                    </div>
                    <div className={styles.text}>
                        <span className={styles.title}>
                            Success
                        </span>
                        <p className={`${styles.description} primary_text`}>
                            {message}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
