import { memo, useState } from 'react';
import styles from '../page.module.css'
import { useSelector, useDispatch } from 'react-redux';
import JobBar from '../JobBar'
import { taskRemainingSelector } from '../../../redux/selectors'


function TaskPage(props) {
    console.log("TaskPage component rendered");
    const dispatch = useDispatch();
    const jobs = useSelector(taskRemainingSelector);
    const homeActions = useSelector((state) => state.jobs.homeActions);
    const [input, setInput] = useState('');

    const arrow = {
        COMPLETED : styles.completedArrow,
        UNCOMPLETED : styles.unCompletedArrow,
        BUG : styles.bugArrow,
        EXPIRED : styles.expiredArrow,
    }

    const status = {
        COMPLETED : 'completedJobs',
        UNCOMPLETED : 'unCompletedJobs',
        BUG : 'bugJobs',
        EXPIRED : 'expiredJobs'
    }


    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentHeader}>
                        <h1>Completed tasks</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar}>
                        <div className={styles.reloadBtn}>
                            <span className={styles.reloadText}>Reload</span>
                            <i className="fas fa-redo"></i>
                        </div>
                        <div className={styles.search}>
                            <input className={styles.searchInput} />
                            <div className={styles.searchBtn}>
                                <span className={styles.searchText}>Search</span>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <JobBar status={props.status} list={jobs[props.jobStatus]} action={homeActions[props.jobStatus]} title={props.title}/>

                </div>
            </div>
        </div>
    )
}

export default memo(TaskPage);