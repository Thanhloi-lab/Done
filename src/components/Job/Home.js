import {memo, useState, useEffect} from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import styles from './page.module.css'

function Home(){

    console.log("job-home component rendered");

    const [wrap, setWrap] = useState(
        {
            completed: false,
            uncompleted: false,
        }
    );

    const handleWrap = (id)=>{
        const wrapper = document.getElementById(id);
        try{
            if(!wrapper.classList.contains(styles.active)){
                wrapper.classList.add(styles.active);
                
            }
            else if(wrapper.classList.contains(styles.active)) {
                const childs = document.querySelectorAll('#' + id + " ." + styles.listProject);
                childs.forEach((child)=>{
                    child.classList.remove(styles.active);
                })
                wrapper.classList.remove(styles.active);
            }
        }
        catch(e){
            return
        }
        
    }
    
    
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentHeader}>
                        <h1>MY JOB HOME PAGE</h1>
                    </div>


                    <div className={styles.taskContainer}>
                        <div className={styles.completed}>
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('completed')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="completed">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.comeIcon}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI1</p>
                                        <div className={styles.comeIcon}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE1</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE1')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE1">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName }>Xử lý UI</p>
                                        <div className={styles.comeIcon}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.unCompleted}>
                            <span className={styles.projectHeader}>Uncompleted tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('unCompleted')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject + ' '+ styles.active} id="unCompleted">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE2</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE2')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE2"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.comeIconUncomplete}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE3</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE3')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE3">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName }>Xử lý UI</p>
                                        <div className={styles.comeIconUncomplete}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.bug}>
                            <span className={styles.projectHeader}>Bug tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('bugTasks')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject + ' '+ styles.active} id="bugTasks">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE4</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE4')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE4"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.comeIconBug}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE5</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE5')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE5">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName }>Xử lý UI</p>
                                        <div className={styles.comeIconBug}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>
                </div>
                
            </div>
        </div>
    )
}

export default Home;