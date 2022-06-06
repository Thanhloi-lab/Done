import { memo, useEffect } from 'react';
import styles from './page.module.css';
import tableStyles from './tableStyles.module.css';
import jobsSlice from './jobsSlice'
import { useDispatch, useSelector } from 'react-redux';
import { handleLoadAllTasks } from '../../asset/js/API/callAPI'
import JobBar from './JobBar.js'
import filtersSlice from '../Filters/FilterSlice'
import { taskRemainingSelector, allFilterText } from '../../redux/selectors'

function Home() {
    console.log("job-home component rendered");

    const dispatch = useDispatch();
    const jobs = useSelector(taskRemainingSelector);
    const homeActions = useSelector((state) => state.jobs.homeActions);

    const handleTextChange = (e) => {
        dispatch(filtersSlice.actions.filtersTextChange(e.target.value));
        dispatch(filtersSlice.actions.statusFiltersChange('All'));
    }

    const handleReload = (event) => {
        handleLoadAllTasks(2)
        .then(result => {
            // console.log(result);
            dispatch(jobsSlice.actions.getAllTasks(result));
            if (event === 'reload')
                dispatch(jobsSlice.actions.reloadJobAction());
        })
        .catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        handleReload('load');
    }, [])

    // const handleReload = (event) => {
    //     handleLoadAllTasks(2)
    //         .then(result => {
    //             // console.log(result);
    //             dispatch(jobsSlice.actions.getAllTasks(result));
    //             if (event === 'reload')
    //                 dispatch(jobsSlice.actions.reloadJobAction());
    //         })
    //         .catch(err => {
    //             console.log(err);
    //         })
    // }
    
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MY JOB HOME PAGE</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar}>
                        <div className={styles.reloadBtn} onClick={() => handleReload('reload')}>
                            <span className={styles.reloadText}>Reload</span>
                            <i className="fas fa-redo"></i>
                        </div>
                        <div className={styles.search}>
                            <input className={styles.searchInput} onChange={handleTextChange} value={useSelector(allFilterText)} />
                            <div className={styles.searchBtn}>
                                <span className={styles.searchText}>Search</span>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <JobBar status='completed' list={jobs.completedJobs} action={homeActions['completedJobs']} title='Completed task' />
                    <JobBar status='unCompleted' list={jobs.unCompletedJobs} action={homeActions['unCompletedJobs']} title='Uncompleted task' />
                    <JobBar status='bug' list={jobs.bugJobs} action={homeActions['bugJobs']} title='Bug task' />
                    <JobBar status='expired' list={jobs.expiredJobs} action={homeActions['expiredJobs']} title='Expired task' />

                </div>

            </div>
        </div>
    )
}

export default memo(Home);