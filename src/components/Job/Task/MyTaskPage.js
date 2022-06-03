import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyTask.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { allTaskOfUser, deleteTask, editTask } from '../../../asset/js/API/TaskApi';
import { useSelector, useDispatch } from "react-redux";


//mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

function MyTaskPage({ projectDetail, owner, ...props }) {
    console.log("taskPage component rendered " + owner);
    let navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [fullTasks, setFullTasks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const location = useLocation();

    const user = useSelector((state) => state.users);

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [taskEdit, setTaskEdit] = useState({ nameTask: '', idProject: 0 });

    const titleEdit = "Change task's name";
    const editContent = "Enter new task's name here to edit task's name";
    const titleDelete = "Delete task ";
    const deleteContent = "Are you sure you want to task?";


    useEffect(() => {
        getAllTask();
    }, [])

    const getAllTask = () => {
        var resultPromise = allTaskOfUser(user.userInfo.idUser, user.userInfo.token);
        resultPromise.then((result) => {
            if (owner) {
                var temp = result.filter(x => x.userCreateProject === user.userInfo.idUser && x.idProject === location.state.idProject);
                setFullTasks(temp);
                setTasks(temp);
                console.log(result)
            }
            else {
                setFullTasks(result);
                setTasks(result);
            }

        })
            .catch((err) => console.log(err))
    }

    const handleLinkTaskDetail = (taskId) => {
        navigate(`/job/task/${taskId}`);
    }

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.trim() !== '') {
            setTasks(fullTasks.filter(x => x.nameTask.toLowerCase().includes(e.target.value.trim().toLowerCase())))
        }
        else {
            setTasks(fullTasks);
        }
    }

    const handleReload = () => {
        getAllTask();
        setSearchText('');
    }

    const handleDeleteTask = () => {
        var data = {
            IdUser: user.userInfo.idUser,
            IdSth: taskEdit.idTask
        }
        var result = deleteTask(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setTaskEdit({ nameTask: '', idProject: 0 });
                getAllTask();
                handleClose();
                alert(response.resultObject);
            }
            else {
                alert(response.message);
            }
        })
            .catch(err => {
                alert("Xóa thất bại");
            })
    }

    const handleEditTask = (taskId) => {
        var data = {
            taskName: taskEdit.nameTask,
            IdUser: user.userInfo.idUser,
            IdTask: taskEdit.idTask,
        }
        var result = editTask(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setTaskEdit({ nameTask: '', idTask: 0 });
                getAllTask();
                handleClose();
                alert(response.resultObject);
            }
            else {
                alert(response.message);
            }
        })
            .catch(() => {
                alert("Sửa thất bại")
            })
    }

    const handleClickEdit = (event, id, name) => {
        event.stopPropagation()
        navigate(`/job/update-task/${id}`);
        // console.log(id);
        // setprojectEdit({...projectEdit, idproject: id, nameproject:name});
        // setOpenDelete(false);
        // setOpenEdit(true);
        // setOpenDialog(true);
    };

    const handleClickDelete = (event, id, name) => {
        event.stopPropagation()
        setTaskEdit({ ...taskEdit, idTask: id, nameTask: name });
        setOpenDelete(true);
        setOpenEdit(false);
        setOpenDialog(true);
    };


    const handleClose = (event) => {
        setOpenDialog(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };

    const handleTaskNameChange = (e) => {
        setTaskEdit({ ...taskEdit, nameTask: e.target.value });
    }

    const handleActionModal = () => {
        if (openDelete) {
            handleDeleteTask();
        }
        else if (openEdit) {
            handleEditTask();
        }
    }

    const navigateListTask = (event, id) => {
        event.stopPropagation();
        navigate(`/job/${id}/Tasks`);
    }
    const handleNavigateTaskDetail = (event, id) => {
        event.stopPropagation();
        navigate(`/job/task/${id}`);
    }

    const DialogEdit = () => {
        return (
            <Dialog open={openDialog} onClose={handleClose}
                maxWidth='sm'
                fullWidth
            // PaperProps={{sx: { fontSize: '2rem !important' }}}
            >
                <DialogTitle><span style={{ fontSize: '2.5rem' }}>{openEdit && titleEdit}{openDelete && titleDelete + taskEdit.nameTask}</span></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontSize: '2rem' }}>{openEdit && editContent}{openDelete && deleteContent}</span>
                    </DialogContentText>
                    {openEdit &&
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newTaskName"
                            label="task's name"
                            type="text"
                            value={taskEdit.nameTask}
                            onChange={handleTaskNameChange}
                            fullWidth
                            variant="standard"
                            InputProps={{ style: { fontSize: '1.8rem', fontWeight: '700' } }}
                            InputLabelProps={{ style: { fontSize: '2rem' } }}
                        />
                    }
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="contained" color='primary' size="medium" autoFocus startIcon={<HighlightOffIcon />}>Cancel</Button>
                    <Button onClick={handleActionModal} variant="outlined" size="medium"
                        startIcon={openEdit ? <EditIcon /> : <DeleteIcon />} fontSize='2rem'
                        color={openEdit ? 'secondary' : 'error'}>{openEdit ? "Edit" : "Delete"}
                    </Button>
                </DialogActions>
            </Dialog>
        )
    }


    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>{!projectDetail && (owner ? 'MY TASKS' : 'TASKS')} {projectDetail && 'PROJECT DETAIL'}</h1>
                    </div>

                    <div className={stylesBtn.FeatureContainer}>
                        {!projectDetail && owner &&
                            <div className={styles.taskContainer + ' ' + styles.toolBar
                                + ' ' + styles.nonBoxShadow + ' ' + tableStyles.content
                                + ' ' + stylesBtn.FlexContainer}
                            >
                                <div className={stylesBtn.btnContainer} style={{ marginRight: '30px' }}>
                                    <div className={stylesBtn.addBtn}>
                                        <i className="fa-solid fa-plus" ></i>
                                        <span className={styles.addtext} style={{ marginLeft: '10px' }}>New task</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={styles.taskContainer + ' ' + stylesBtn.searchContainer} style={{ flex: 'inherit' }}>
                            <div className={styles.toolBar}>
                                <div className={styles.reloadBtn} onClick={handleReload}>
                                    <span className={styles.reloadText}>Reload</span>
                                    <i className="fas fa-redo"></i>
                                </div>
                                <div className={styles.search}>
                                    <input className={styles.searchInput} value={searchText} onChange={handleTextChange} />
                                    <div className={styles.searchBtn}>
                                        <span className={styles.searchText}>Search</span>
                                        <i className="fas fa-search"></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.taskContainer + ' ' + tableStyles.content} style={{ 'overflowX': 'auto', 'margin': '0 auto' }}>
                        <table className={stylesBtn.table100} >
                            <thead className={stylesBtn.Table100Head}>
                                <tr>
                                    <th>Order</th>
                                    <th>Name</th>
                                    <th>
                                        Deadline
                                    </th>
                                    <th>Task Create Date</th>
                                    {owner && <th></th>}
                                </tr>
                            </thead>
                            <tbody className={stylesBtn.Table100Body}>

                                {tasks && tasks.map((x, index) => {
                                    return (
                                        <tr key={x.idTask} style={{ cursor: 'pointer' }} onClick={(s, e) => {
                                            s.stopPropagation();
                                            handleLinkTaskDetail(x.idTask);
                                        }}>
                                            <td>{index + 1}</td>
                                            <td>{x.nameTask}</td>
                                            <td>{x.deadline}</td>
                                            <td >{x.taskCreateDate}</td>
                                            {owner &&
                                                <td>
                                                    <div className={stylesBtn.deleteBtn} onClick={(event) => handleClickDelete(event, x.idTask, x.nameTask)} >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <span className={stylesBtn.deleteText} style={{ marginLeft: '10px' }}>Delete</span>
                                                    </div>
                                                    {/* onClick={(s, e) => handleDeleteproject(x.idproject)} */}
                                                    /
                                                    <div className={stylesBtn.editBtn} onClick={(event) => handleClickEdit(event, x.idTask, x.nameTask)}>
                                                        <i className="fa-solid fa-pen-to-square"></i>
                                                        <span className={stylesBtn.editText} style={{ marginLeft: '10px' }}>Edit</span>
                                                    </div>
                                                </td>
                                            }
                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            {DialogEdit()}
        </div>
    )
}

export default memo(MyTaskPage);
