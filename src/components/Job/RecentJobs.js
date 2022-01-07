import {memo, useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './page.module.css'

function RecentJobs(){

    console.log("recent job component rendered");

    return (
        <>
            <div className={styles.limiter}>
                <div className={styles.container}>
                    <div className={styles.wrapper}>
                        RECENT 
                    </div>
                </div>
            </div>
        </>
    )
}

export default RecentJobs;