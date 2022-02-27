import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import { STATUS, STATUS_ID, STATUS_NAME } from '../../../asset/js/constant'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';



function TaskInfo(props) {
    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentHeader}>
                        <h1>Task detail</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <Link className={styles.reloadBtn} to={useSelector((state) => state.jobs.path)}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </Link>

                        {props.detail && props.detail.statusId === STATUS_NAME['UNCOMPLETED'] &&
                            <button className={styles.checkBtn}>
                                <span className={styles.checkText}>Complete</span>
                                <i className="fas fa-check"></i>
                            </button>
                        }
                    </div>
                    {props.detail &&
                        <>
                            <table className={tableStyles.table}>
                                <tbody>
                                    <tr>
                                        <th>My task:</th>
                                        <td>{props.detail.nameTask}</td>
                                    </tr>
                                    <tr>
                                        <th>Description:</th>
                                        <td>
                                            {props.detail.content}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Created date:</th>
                                        <td>
                                            {props.detail.taskCreateDate}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Deadline:</th>
                                        <td>
                                            {props.detail.deadline}
                                        </td>
                                    </tr>
                                    <tr>
                                        <th>Updated date:</th>
                                        <td>
                                            {props.detail.updateDate}
                                        </td>
                                    </tr>
                                    <br/>
                                    <br/>
                                    <tr>
                                        <th>Group's name:</th>
                                        <td>{props.detail.nameGroup}</td>
                                    </tr>
                                    <tr>
                                        <th>Group creator:</th>
                                        <td>{props.detail.nameUserCreateGroup}</td>
                                    </tr>
                                    <tr>
                                        <th>Group creator's phone:</th>
                                        <td>{props.detail.phoneUserCreateGroup}</td>
                                    </tr>
                                    <tr>
                                        <th>Group creator's email:</th>
                                        <td>{props.detail.mailUserCreateProject}</td>
                                    </tr>
                                    <br/>
                                    <br/>
                                    <tr>
                                        <th>Project's name:</th>
                                        <td>{props.detail.nameProject}</td>
                                    </tr>
                                    <tr>
                                        <th>Project creator:</th>
                                        <td>{props.detail.nameUserCreateProject}</td>
                                    </tr>
                                    <tr>
                                        <th>Project creator's phone:</th>
                                        <td>{props.detail.phoneUserCreateProject}</td>
                                    </tr>
                                    <tr>
                                        <th>Project creator's email:</th>
                                        <td>{props.detail.mailUserCreateProject}</td>
                                    </tr>
                                </tbody>
                            </table>
                            <div className={styles.taskContainer + ' ' + tableStyles.taskStatus}>
                                <div className={styles[STATUS[STATUS_ID[props.detail.statusId]]]}>
                                    <span className={styles.projectHeader}>{STATUS_ID[props.detail.statusId]}</span>
                                </div>
                            </div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default TaskInfo;