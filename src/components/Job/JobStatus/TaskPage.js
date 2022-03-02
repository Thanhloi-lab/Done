import { memo } from 'react';
import styles from '../page.module.css'
import { useSelector, useDispatch } from 'react-redux';
import {handleLoadAllTasks} from '../../../asset/js/callAPI'
import jobsSlice from '../jobsSlice'
import JobBar from '../JobBar'

function TaskPage(props) {
    console.log("TaskPage component rendered");
    const dispatch = useDispatch();
    const jobs = useSelector((state) => state.jobs.allTasks);

    const homeActions = useSelector((state) => state.jobs.homeActions);
    

    const handleReload = () => {
        handleLoadAllTasks(2)
            .then(result => {
                dispatch(jobsSlice.actions.getAllTasks(result));
            })
            .catch(err => {
                console.log(err);
            })
    }

    const handleWrap = (id) => {
        const wrapper = document.getElementById(id);
        const btn = document.getElementById(id + 'Btn');
        try {
            if (!wrapper.classList.contains(styles.active)) {
                wrapper.classList.add(styles.active);
                btn.classList.add(styles.rotateBtn);
            }
            else if (wrapper.classList.contains(styles.active) && btn.classList.contains(styles.rotateBtn)) {
                const childs = document.querySelectorAll('#' + id + " ." + styles.listProject);
                childs.forEach((child) => {
                    child.classList.remove(styles.active);
                })
                const childBtn = wrapper.childNodes;
                childBtn.forEach((child) => {
                    if (child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn)) {
                        child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn).classList.remove(styles.rotateBtn);
                    }
                })

                wrapper.classList.remove(styles.active);
                btn.classList.remove(styles.rotateBtn);
            }
        }
        catch (e) {
            console.log(e)
            return
        }

    }

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