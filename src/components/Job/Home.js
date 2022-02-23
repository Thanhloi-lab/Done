import {memo, useEffect} from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import tableStyles from './tableStyles.module.css';
// import {runGetAllMembersInTask} from '../CallRPC';

function Home(){

    console.log("job-home component rendered");
    


    const handleWrap = (id)=>{
        const wrapper = document.getElementById(id);
        const btn = document.getElementById(id+'Btn');
        try{
            if(!wrapper.classList.contains(styles.active)){
                wrapper.classList.add(styles.active);
                btn.classList.add(styles.rotateBtn);
            }
            else if(wrapper.classList.contains(styles.active) && btn.classList.contains(styles.rotateBtn)) {
                const childs = document.querySelectorAll('#' + id + " ." + styles.listProject);
                childs.forEach((child)=>{
                    child.classList.remove(styles.active);
                })
                const childBtn = wrapper.childNodes;
                childBtn.forEach((child)=>{
                    if(child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn)){
                        child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn).classList.remove(styles.rotateBtn);
                    }
                })

                wrapper.classList.remove(styles.active);
                btn.classList.remove(styles.rotateBtn);
            }
        }
        catch(e){
            console.log(e)
            return
        }
        
    }
    
    
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MY JOB HOME PAGE</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar}>
                        <div className={styles.reloadBtn}>
                            <span className={styles.reloadText}>Reload</span>
                            <i className="fas fa-redo"></i>
                        </div>
                        <div className={styles.search}>
                            <input className={styles.searchInput}/>
                            <div className={styles.searchBtn}>
                                <span className={styles.searchText}>Search</span>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.completed}>
                            <span className={styles.projectHeader}>Completed tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('completed')
                            }}>
                                <i className="fas fa-chevron-down" id="completedBtn"></i>
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="completed">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE')
                                    }}>
                                        <i className="fas fa-chevron-down" id="DONEBtn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <Link to='/job/123' className={styles.completedArrow}>
                                            <i className="fas fa-chevron-right"></i>
                                        </Link>
                                    </li>
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI1</p>
                                        <div className={styles.completedArrow}>
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
                                        <i className="fas fa-chevron-down" id="DONE1Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE1">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName }>Xử lý UI</p>
                                        <div className={styles.completedArrow}>
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
                                <i className="fas fa-chevron-down" id="unCompletedBtn"></i>
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="unCompleted">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE2</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE2')
                                    }}>
                                        <i className="fas fa-chevron-down" id="DONE2Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE2"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.unCompletedArrow}>
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
                                        <i className="fas fa-chevron-down" id="DONE3Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE3">
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName }>Xử lý UI</p>
                                        <div className={styles.unCompletedArrow}>
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
                                <i className="fas fa-chevron-down" id="bugTasksBtn"></i>
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="bugTasks">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE4</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE4')
                                    }}>
                                        <i className="fas fa-chevron-down" id="DONE4Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE4"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.bugArrow}>
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
                                        <i className="fas fa-chevron-down" id="DONE5Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE5"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.bugArrow}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles.expired}>
                            <span className={styles.projectHeader}>Expired tasks</span>
                            <span className={styles.wrapBtn} onClick={()=>{
                                handleWrap('expiredTasks')
                            }}>
                                <i className="fas fa-chevron-down" id="expiredTasksBtn"></i>
                            </span>
                        </div>
                        
                        <ul className={styles.listProject} id="expiredTasks">
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE6</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE6')
                                    }}>
                                        <i className="fas fa-chevron-down" id="DONE6Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE6"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.expiredArrow}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
                                    </li>
                                </ul>
                            </li>
                            <li>
                                <div className={styles.projectContainer}>
                                    <span className={styles.projectTitle}>Project: DONE7</span>
                                    <span className={styles.wrapBtn} onClick={()=>{
                                         handleWrap('DONE7')
                                    }}>
                                        <i className="fas fa-chevron-down" id="DONE7Btn"></i>
                                    </span>
                                </div>
                                <ul className={styles.listProject} id="DONE7"> 
                                    <li className={styles.projectItem}>
                                        <p className={styles.taskName}>Xử lý UI</p>
                                        <div className={styles.expiredArrow}>
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

export default memo(Home);