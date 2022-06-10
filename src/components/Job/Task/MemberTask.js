import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyTask.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { allTaskOfUser, deleteTask, editTask, allTaskByProjectId } from '../../../asset/js/API/TaskApi';
import { useSelector, useDispatch } from "react-redux";
import jobsSlice from '../jobsSlice'


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
    const dispatch = useDispatch();
    console.log("taskPage component rendered " + owner);
    let navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [fullTasks, setFullTasks] = useState([]);
    const [searchText, setSearchText] = useState('');

    const location = useLocation();


    const user = useSelector((state) => state.users);

    const [show, setShow] = useState(location.state.createUser === user.userInfo.idUser ? true : false);

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
        var resultPromise = allTaskByProjectId(location.state.idProject, user.userInfo.idUser, user.userInfo.token);
        resultPromise.then((result) => {



            setFullTasks(result);
            setTasks(result);




        })
            .catch((err) => console.log(err))
    }

    const handleLinkTaskDetail = (taskId) => {
        navigate(`/job/task/${taskId}`, {
            state: {
                detail: 2,
                idProject: location.state.idProject,
                idGroup: location.state.idGroup,
                createUser: location.state.createUser,
            }
        });
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




    const handleClose = (event) => {
        setOpenDialog(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };






    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MEMBER TASKS</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <div className={styles.reloadBtn} onClick={() => {
                            navigate(`/job/memberProjects/${location.state.idGroup}`, {
                                state: {

                                    idGroup: location.state.idGroup,
                                }
                            }, { replace: true })
                        }}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </div>
                    </div>

                    <div className={stylesBtn.FeatureContainer}>


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

                                        </tr>
                                    )
                                })
                                }

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default memo(MyTaskPage);
