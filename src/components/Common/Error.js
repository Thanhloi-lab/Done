import styles from '../Job/page.module.css'

function Error(){
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper} style={{minHeight: 'auto', margin: 'auto'}}>
                    <div className={styles.contentHeader} style={{textAlign: 'center', marginBottom: '30px'}}>
                        <h1>404 PAGE NOT FOUND</h1>
                        <img src='images/penguin2.png' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Error

