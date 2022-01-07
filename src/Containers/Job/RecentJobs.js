import React from 'react'
import Recent from '../../components/Job/RecentJobs'
import JobSidebar from '../../components/Job/JobSidebar'
import styles from '../../components/Common/Primary.module.css'
import {RECENT_JOB} from '../../asset/js/constant'


function RecentJobs(){
    return (
        <div className={styles.container}>
            <div className={styles.containerBackground}>
                <JobSidebar page={RECENT_JOB}/>
                <Recent/>
                
            </div>
        </div>
    )
}

export default RecentJobs;