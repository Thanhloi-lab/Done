import {memo, useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './page.module.css'

function JobList(){

    console.log("job-list component rendered");

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        List
                    </div>
                </div>
            </div>
        </>
    )
}

export default JobList;