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
                                </ul>
                            </li>
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                        //  handleWrap('DONE')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject+ ' '+ styles.active}>
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
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('completed')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject + ' '+ styles.active} id="completed">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                        //  handleWrap('DONE')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject+ ' '+ styles.active}>
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
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                        //  handleWrap('DONE')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul className={styles.listProject+ ' '+ styles.active}>
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
                </div>
                
            </div>
        </div>
    )
}

export default Home;