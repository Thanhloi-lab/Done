import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import { STATUS, STATUS_ID, STATUS_NAME } from '../../../asset/js/constant'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useState } from 'react'
import { updateStatus } from '../../../asset/js/API/TaskApi';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

function TaskInfo(props) {
    const [groupShow, setGroupShow] = useState(false);
    const [projectShow, setProjectShow] = useState(false);
    const [open, setOpen] = useState(false);
    const [taskStatus, setTaskStatus] = useState();
    const [taskStatusID, setTaskStatusID] = useState();
    const location = useLocation();
    const navigate = useNavigate();

    const user = useSelector((state) => state.users);
    const handleReturn = () => {

        if (location.state) {
            if (location.state.detail === 1) {
                navigate(`/job/project/${location.state.idProject}`, {
                    state: {

                        idProject: location.state.idProject,
                        idGroup: location.state.idGroup,
                        createUser: location.state.createUser,
                    }
                }, { replace: true })
            }
            if (location.state.detail === 2) {
                navigate(`/job/memberTasks/${location.state.idProject}`, {
                    state: {

                        idProject: location.state.idProject,
                        idGroup: location.state.idGroup,
                        createUser: location.state.createUser,
                    }
                }, { replace: true })
            }
        }
        else {
            navigate("/job", { replace: true })
        }
    }

    const handleOnWrap = (className) => {
        const listItem = document.getElementsByClassName(className);

        for (let item of listItem) {
            if (item.classList.contains(tableStyles.unActive)) {
                item.classList.remove(tableStyles.unActive);
                item.setAttribute('style', 'border-bottom:1px solid #dddddd;')
                item.lastChild.setAttribute('style', 'padding:12px 15px;')
            }
            else {
                item.classList.add(tableStyles.unActive);
                item.setAttribute('style', 'border-bottom:0px;')
                item.lastChild.setAttribute('style', 'padding:1px')

            }
        }
    }

    const handleClickOpen = (id, status) => {
        console.log(props);
        setTaskStatusID(id);
        setTaskStatus(status);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        handleUpdateStatus();
        setOpen(false);
    }

    const handleUpdateStatus = () => {

        var status = {
            idTask: props.detail.idTask,
            idStatus: taskStatusID,
        }
        var result = updateStatus(status, user.userInfo.token);
        result
            .then(result => {
                alert("updated");
                handleReturn();
            })
            .catch(err => {
                alert(err);
            })
    }


    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper}>
                    <div className={styles.contentHeader}>
                        <h1>Task detail</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <div className={styles.reloadBtn} onClick={handleReturn}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </div>
                        <div>
                            <div>
                                {props.detail && (props.detail.statusId === STATUS_NAME['UNCOMPLETED'] || props.detail.statusId === STATUS_NAME['BUG'] || props.detail.statusId === STATUS_NAME['EXPIRED']) && props.detail.userCreateProject === user.userInfo.idUser &&
                                    <button className={styles.checkBtn} onClick={() => handleClickOpen(2, "Completed")}>
                                        <span className={styles.checkText}>Complete</span>
                                        <i className="fas fa-check"></i>
                                    </button>
                                }
                            </div>
                            <div style={{ marginTop: "10px" }}>
                                {props.detail && (props.detail.statusId === STATUS_NAME['UNCOMPLETED'] || props.detail.statusId === STATUS_NAME['COMPLETED']) && props.detail.userCreateProject === user.userInfo.idUser &&
                                    <button className={styles.checkBug} onClick={() => handleClickOpen(3, "Bug")}>
                                        <span className={styles.checkText}>Bug</span>
                                        <i class="fa-solid fa-bug"></i>
                                    </button>
                                }
                            </div>

                            <div style={{ marginTop: "10px" }}>
                                {props.detail && (props.detail.statusId === STATUS_NAME['BUG'] || props.detail.statusId === STATUS_NAME['COMPLETED']) && props.detail.userCreateProject === user.userInfo.idUser &&
                                    <button className={styles.checkUnCom} onClick={() => handleClickOpen(1, "Uncompleted")}>
                                        <span className={styles.checkText}>Uncompleted</span>
                                        <i class="fa-solid fa-xmark"></i>
                                    </button>
                                }
                            </div>
                        </div>
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
                                    <tr className={tableStyles.unActive + ' project'}>
                                        <th>Project creator:</th>
                                        <td style={{ padding: 1 }}>{props.detail.nameUserCreateProject}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive + ' project'}>
                                        <th>Project creator's phone:</th>
                                        <td style={{ padding: 1 }}>{props.detail.phoneUserCreateProject}</td>
                                    </tr>
                                    <tr className={tableStyles.unActive + ' project'}>
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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
                maxWidth='sm'
                fullWidth
            >
                <DialogTitle id="alert-dialog-title">
                    <span style={{ fontSize: '2.5rem' }}>Alert</span>
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        <span style={{ fontSize: '2rem' }}>Are you really want to edit this task status to {taskStatus} ?</span>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree} variant="contained" size="large" fontSize='2rem' color='primary'>Agree</Button>
                    <Button onClick={handleClose} autoFocus variant="outlined" size="large" fontSize='2rem'>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default TaskInfo;