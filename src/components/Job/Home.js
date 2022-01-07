import {memo, useState} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './page.module.css'

function Home(){

    console.log("job-home component rendered");

    const click=()=>{
        console.log('click')
    }
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <span style={{'fontSize':'5rem'}}>Home page content</span>
                </div>
                
            </div>
        </div>
    )
}

export default Home;