import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import { STATUS, STATUS_ID, STATUS_NAME } from '../../../asset/js/constant'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'

function TaskInfo(props) {
    const [groupShow, setGroupShow] = useState(false);
    const [projectShow, setProjectShow] = useState(false);

    const handleOnWrap = (className) => {
        const listItem = document.getElementsByClassName(className);

        for (let item of listItem) {
            if (item.classList.contains(tableStyles.unActive)) {
                item.classList.remove(tableStyles.unActive);
                item.lastChild.setAttribute('style', 'padding:12px 15px;')
            }
            else {
                item.classList.add(tableStyles.unActive);
                item.setAttribute('style', 'border-bottom:0px;',)
                item.lastChild.setAttribute('style', 'padding:1px')

            }
        }
    }

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
                                    <tr style={{ 'border': 'none' }}>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                    <tr style={{ 'border': 'none' }}>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                    <tr >
                                        <th >
                                            <span className={tableStyles.groupName} onClick={() => handleOnWrap('group')}>Group's name  <i className="fa-solid fa-eye"></i></span>
                                        </th>
                                        <td><Link to="/" className={tableStyles.LinkToGroup}>{props.detail.nameGroup}</Link></td>
                                    </tr>
                                    <tr className={tableStyles.unActive + ' group'}>
                                        <th>Group creator:</th>
                                        <td style={{ padding: 1 }}>{props.detail.nameUserCreateGroup}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive + ' group'}>
                                        <th>Group creator's phone:</th>
                                        <td style={{ padding: 1 }}>{props.detail.phoneUserCreateGroup}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive + ' group'}>
                                        <th>Group creator's email:</th>
                                        <td style={{ padding: 1 }}><Link to="/" className={tableStyles.LinkToUser}>{props.detail.mailUserCreateGroup}</Link></td>
                                    </tr>
                                    <tr style={{ 'border': 'none' }}>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                    <tr style={{ 'border': 'none' }}>
                                        <th></th>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <th>
                                            <span className={tableStyles.projectName} onClick={() => handleOnWrap('project')}>Project's name  <i className="fa-solid fa-eye"></i></span>
                                        </th>
                                        <td>
                                            <Link to="/" className={tableStyles.LinkToProject}>{props.detail.nameProject}</Link>
                                        </td>
                                    </tr>
                                    <tr className={tableStyles.unActive+ ' project'}>
                                        <th>Project creator:</th>
                                        <td style={{ padding: 1 }}>{props.detail.nameUserCreateProject}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive+ ' project'}>
                                        <th>Project creator's phone:</th>
                                        <td style={{ padding: 1 }}>{props.detail.phoneUserCreateProject}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive+ ' project'}>
                                        <th>Project creator's email:</th>
                                        <td style={{ padding: 1 }}><Link to="/" className={tableStyles.LinkToUser}>{props.detail.mailUserCreateProject}</Link></td>
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