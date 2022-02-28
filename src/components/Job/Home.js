import { memo, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import tableStyles from './tableStyles.module.css';
import jobsSlice from './jobsSlice'
import { useDispatch, useSelector } from 'react-redux';
import {handleLoadAllTasks} from '../../asset/js/callAPI'


function Home() {
    console.log("job-home component rendered");
    
    const dispatch = useDispatch();

    useEffect(() => {
        handleReload();
    }, [])

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
    
    const handleReload = () => {
        handleLoadAllTasks(2)
            .then(result=>{
                dispatch(jobsSlice.actions.getAllTasks(result));
            })
            .catch(err => {
                console.log(err);
            })
        // const state = ;
        // dispatch(jobsSlice.actions.getAllTasks());
    }

    const jobs = useSelector((state) => state.jobs.allTasks);

    // console.log(jobs)
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MY JOB HOME PAGE</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar}>
                        <div className={styles.reloadBtn} onClick={handleReload}>
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

                    <div className={styles.taskContainer}>
                        <div className={styles.completed}>
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={() => {
                                handleWrap('completed')
                            }}>
                                <i className="fas fa-chevron-down" id="completedBtn"></i>
                            </span>
                        </div>

                        <ul className={styles.listProject} id="completed">
                            {jobs.completedJobs && jobs.completedJobs.map(project => {
                                return (
                                    <li key={project.idProject}>
                                        <div className={styles.projectContainer}>
                                            <span className={styles.projectTitle}>Project: {project.value[0].nameProject}</span>
                                            <span className={styles.wrapBtn} onClick={() => {
                                                handleWrap('completedTask' + project.idProject)
                                            }}>
                                                <i className="fas fa-chevron-down" id={'completedTask' + project.idProject + "Btn"}></i>
                                            </span>
                                        </div>
                                        <ul className={styles.listProject} id={'completedTask' + project.idProject}>
                                            {project.value && project.value.map((job) => {
                                                return (
                                                    <li className={styles.projectItem} key={job.idTask}>
                                                        <p className={styles.taskName}>{job.nameTask}</p>
                                                        <Link to={'/job/' + job.idTask} className={styles.completedArrow}>
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.unCompleted}>
                            <span className={styles.projectHeader}>Uncompleted tasks</span>
                            <span className={styles.wrapBtn} onClick={() => {
                                handleWrap('unCompleted')
                            }}>
                                <i className="fas fa-chevron-down" id="unCompletedBtn"></i>
                            </span>
                        </div>

                        <ul className={styles.listProject} id="unCompleted">
                            {jobs.unCompletedJobs && jobs.unCompletedJobs.map(project => {
                                return (
                                    <li key={project.idProject}>
                                        <div className={styles.projectContainer}>
                                            <span className={styles.projectTitle}>Project: {project.value[0].nameProject}</span>
                                            <span className={styles.wrapBtn} onClick={() => {
                                                handleWrap('unCompletedTask' + project.idProject)
                                            }}>
                                                <i className="fas fa-chevron-down" id={'unCompletedTask' + project.idProject + "Btn"}></i>
                                            </span>
                                        </div>
                                        <ul className={styles.listProject} id={'unCompletedTask' + project.idProject}>
                                            {project.value && project.value.map((job) => {
                                                return (
                                                    <li className={styles.projectItem} key={job.idTask}>
                                                        <p className={styles.taskName}>{job.nameTask}</p>
                                                        <Link to={'/job/' + job.idTask} className={styles.unCompletedArrow}>
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.bug}>
                            <span className={styles.projectHeader}>Bug tasks</span>
                            <span className={styles.wrapBtn} onClick={() => {
                                handleWrap('bugTasks')
                            }}>
                                <i className="fas fa-chevron-down" id="bugTasksBtn"></i>
                            </span>
                        </div>

                        <ul className={styles.listProject} id="bugTasks">
                            {jobs.bugJobs && jobs.bugJobs.map(project => {
                                return (
                                    <li key={project.idProject}>
                                        <div className={styles.projectContainer}>
                                            <span className={styles.projectTitle}>Project: {project.value[0].nameProject}</span>
                                            <span className={styles.wrapBtn} onClick={() => {
                                                handleWrap('bugTask' + project.idProject)
                                            }}>
                                                <i className="fas fa-chevron-down" id={'bugTask' + project.idProject + "Btn"}></i>
                                            </span>
                                        </div>
                                        <ul className={styles.listProject} id={'bugTask' + project.idProject}>
                                            {project.value && project.value.map((job) => {
                                                return (
                                                    <li className={styles.projectItem} key={job.idTask}>
                                                        <p className={styles.taskName}>{job.nameTask}</p>
                                                        <Link to={'/job/' + job.idTask} className={styles.bugArrow}>
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.expired}>
                            <span className={styles.projectHeader}>Expired tasks</span>
                            <span className={styles.wrapBtn} onClick={() => {
                                handleWrap('expiredTasks')
                            }}>
                                <i className="fas fa-chevron-down" id="expiredTasksBtn"></i>
                            </span>
                        </div>

                        <ul className={styles.listProject} id="expiredTasks">
                            {jobs.expiredJobs && jobs.expiredJobs.map(project => {
                                return (
                                    <li key={project.idProject}>
                                        <div className={styles.projectContainer}>
                                            <span className={styles.projectTitle}>Project: {project.value[0].nameProject}</span>
                                            <span className={styles.wrapBtn} onClick={() => {
                                                handleWrap('expiredTask' + project.idProject)
                                            }}>
                                                <i className="fas fa-chevron-down" id={'expiredTask' + project.idProject + "Btn"}></i>
                                            </span>
                                        </div>
                                        <ul className={styles.listProject} id={'expiredTask' + project.idProject}>
                                            {project.value && project.value.map((job) => {
                                                return (
                                                    <li className={styles.projectItem} key={job.idTask}>
                                                        <p className={styles.taskName}>{job.nameTask}</p>
                                                        <Link to={'/job/' + job.idTask} className={styles.expiredArrow}>
                                                            <i className="fas fa-chevron-right"></i>
                                                        </Link>
                                                    </li>
                                                )
                                            })}
                                        </ul>
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default memo(Home);