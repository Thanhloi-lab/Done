import './Task.css';
// import TaskChat from './TaskChat';
import TaskDetail from './TaskDetail';
import styles from '../page.module.css';
function TaskCommon(){
    return (
        <>
            <div className={styles.limiter}>
                <div className= "task-container">
                    <TaskDetail/>
                    {/* <TaskChat/> */}
                                  
                </div>
            </div>
            
        </>
    )
}
export default TaskCommon;