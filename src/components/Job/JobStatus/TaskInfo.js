import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import {STATUS} from '../../../asset/js/constant'
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';


function TaskInfo(props) {
    return(
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentHeader}>
                        <h1>Task detail</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <Link className={styles.reloadBtn} to={useSelector((state) => state.jobs.path)}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{marginLeft:'10px'}}>Back</span>
                        </Link>

                        { props.status==='UNCOMPLETED' &&
                            <button className={styles.checkBtn}>
                                <span className={styles.checkText}>Complete</span>
                                <i className="fas fa-check"></i>
                            </button>
                        }
                    </div>
                    <table className={tableStyles.table}>
                        <tbody>
                            <tr>
                                <th>Project's name</th>
                                <td>DONE</td>
                            </tr>
                            <tr>
                                <th>My task:</th>
                                <td>Design UI/UX</td>
                            </tr>
                            <tr>
                                <th>Description:</th>
                                <td>
                                    Design UI/UX for job page and push into GitHub.
                                    GitHub link: https://github.com/Thanhloi-lab/Done
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div className={styles.taskContainer + ' ' + tableStyles.taskStatus}>
                        <div className={styles[STATUS[props.status]]}>
                            <span className={styles.projectHeader}>{props.status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TaskInfo;