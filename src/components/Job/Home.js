import {memo, useState, useEffect} from 'react';
// import clsx from 'clsx';
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
        
        if(!wrapper.classList.contains(styles.active)){
            document.getElementById(id).classList.add(styles.active);
        }
        else{
            document.getElementById(id).classList.remove(styles.active);
        }
    }
    
    
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>

                    <div className={styles.taskContainer}>
                        <div>
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('Completed')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="Completed">
                            <li>
                                <div style={{'fontSize' : '2rem'}}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                        // handleWrap('Completed')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul>
                                    <li>
                                        <p>Xử lý UI</p>
                                    </li>
                                </ul>
                                
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div>
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('uncompleted')
                            }}>
                                {!wrap.completed ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="uncompleted">
                            <li>
                                <div style={{'fontSize' : '2rem'}}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                        // handleWrap('Completed')
                                    }}>
                                        {wrap ? <i className="fas fa-chevron-down"></i> : <i className="fas fa-chevron-up"></i>}
                                    </span>
                                </div>
                                <ul>
                                    <li>
                                        <p>Xử lý UI</p>
                                    </li>
                                </ul>
                                
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <ul>
                                    <li>
                                        <p>Xử lý backend</p>
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