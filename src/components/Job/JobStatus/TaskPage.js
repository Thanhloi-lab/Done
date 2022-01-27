import {memo} from 'react';
import styles from '../page.module.css'
import {STATUS} from '../../../asset/js/constant'

function TaskPage(props){

    console.log("TaskPage component rendered");

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
                            <input className={styles.searchInput}/>
                            <div className={styles.searchBtn}>
                                <span className={styles.searchText}>Search</span>
                                <i className="fas fa-search"></i>
                            </div>
                        </div>
                    </div>

                    <div className={styles.taskContainer}>
                        <div className={styles[STATUS[props.status]]}>
                            <span className={styles.projectHeader}>{props.name} tasks</span>
                        </div>
                        
                        <ul className={styles.listProject+ ' ' + styles.active}>
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
                                        <div className={styles.completedArrow}>
                                            <i className="fas fa-chevron-right"></i>
                                        </div>
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

                </div>
            </div>
        </div>
    )
}

export default memo(TaskPage);