import { memo, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css';
import inputStyles from '../InputStyles.module.css';
import UserSelectList from '../User/UserSelectList';
import { getUserByText } from '../../../asset/js/API/UserApi';
import { getTaskById, addTaskMembers, removeTaskMembers, editTask, updateStatus } from '../../../asset/js/API/TaskApi';
import { getUserByTaskId } from '../../../asset/js/API/TaskApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";
import { useLocation } from 'react-router-dom';
import { DateTimePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { IconButton, InputAdornment } from "@material-ui/core";
import SnoozeIcon from "@material-ui/icons/Snooze";
import AlarmIcon from "@material-ui/icons/AddAlarm";
import DateFnsUtils from '@date-io/date-fns';

import { API_URL } from '../../../asset/js/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UpdateTask(props) {
    const [member, setMember] = useState([]);
    const [users, setUsers] = useState([]);
    const [taskName, setTaskName] = useState("");
    const [taskContent, setTaskContent] = useState("");
    const [taskStatus, setTaskStatus] = useState("");
    const [tempStatus, setTempStatus] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [memberDelete, setMemberDelete] = useState([]);
    const location = useLocation();
    const [date, setDate] = useState();

    const [tempDate, setTempDate] = useState();

    const user = useSelector((state) => state.users);

    let id = useParams().id;

    const [task, setTask] = useState({});

    useEffect(() => {
        getTaskById(id, user.userInfo.token)
            .then((result) => {
                if (result) {
                    console.log(result)
                    setTempDate(result.deadline);
                    setDate(result.deadline);
                    setMail(location.state.mailUser);
                    setTask(result);
                    setTaskStatus(result.statusId);
                    setTempStatus(result.statusId);
                    setTaskName(result.nameTask);
                    setTaskContent(result.content);
                    getUserByTaskId(result.idTask, user.userInfo.token)
                        .then((result1) => {
                            setMember(result1);
                            setUsers(result1);
                            setMemberDelete(result1);
                        })
                        .catch((err) => alert(err));
                }
                else {
                    navigate(`/myTasks`);
                }
            })
            .catch(() => navigate(`/myTasks`))
        setLoading(true);
    }, [])


    const handleReloadPage = () => {
        getTaskById(id, user.userInfo.token)
            .then((result) => {
                if (result) {
                    setMail(result.mail);
                    setTask(result);
                    setTaskName(result.nameTask);
                    getUserByTaskId(result.idTask, user.userInfo.token)
                        .then((result1) => {
                            setMember(result1);
                            setUsers(result1);
                            setMemberDelete(result1);
                        })
                        .catch((err) => alert(err));
                }
                else {
                    navigate(`/myTasks`);
                }
            })
            .catch(() => navigate(`/myTasks`))
        setLoading(true);
    }


    const handleSearchUser = () => {
        var searchText = document.getElementById('userSearchText').value;
        if (searchText !== "") {
            getUserByText(searchText)
                .then((result) => {
                    setUsers(result);
                })
                .catch((err) => console.log(err));
        }
    }

    const handleOnClickAddMember = (e) => {
        const listMember = document.getElementById('ListMember');
        if (listMember.classList.contains(inputStyles.active)) {
            if (member.length > 0) {
                handleUpdateTask();
            }
            else {
                handleClickOpen();
            }
            // listMember.classList.remove(inputStyles.active);
            // e.target.innerText = 'Add member';
        }
        else {
            listMember.classList.add(inputStyles.active);
            e.target.innerText = 'Update task';
        }
    }

    const onCheckBoxChange = (id) => {
        const checkBox = document.getElementById(id);

        if (checkBox.checked) {
            var user = users.filter(x => x.mail === id);
            setMember([...member, user[0]]);
        }
        else {
            const newState = member.filter((item) => item.mail !== id);
            setMember(newState);
        }
    }

    const onClickRemoveMember = (id) => {
        if (mail != id) {
            const checkBox = document.getElementById(id);
            if (checkBox) {
                checkBox.checked = false;
            }
            const newState = member.filter((item) => item.mail !== id);
            setMember(newState);
        }
        else {
            alert("can't remove creator")
        }

    }

    const handleMouseEnterAvatar = (id) => {
        const email = document.getElementById(id);
        email.setAttribute('style', 'visibility:visible;')
    }

    const handleMouseLeaveAvatar = (id) => {
        const email = document.getElementById(id);
        email.setAttribute('style', 'visibility:hidden;')
    }

    const handleTaskNameChange = (e) => {
        setTaskName(e.target.value);
    }
    const handleTaskContentChange = (e) => {
        setTaskContent(e.target.value);
    }

    const handleErrorImg = (e) => {
        e.target.src = '/images/penguin1.png'
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleAgree = () => {
        handleUpdateTask();
    }

    const handleUpdateTask = () => {
        var deadlineTime;
        if (date !== tempDate) {
            date.setTime(date.getTime() + (7 * 60 * 60 * 1000));
            deadlineTime = date.toISOString();
        }
        else {
            deadlineTime = date;
        }
        console.log(date, deadlineTime, taskStatus)


        if (taskName.trim() === "") {
            alert("Task name must be enter");
            return;
        }
        if (taskContent.trim() === "") {
            alert("Task content must be enter");
            return;
        }

        var data = {
            idTask: id,
            idUser: user.userInfo.idUser,
            taskName: taskName.trim(),
            deadline: deadlineTime,
            content: taskContent.trim(),

        }
        var result = editTask(data, user.userInfo.token);
        result
            .then(result => {

                handleRemoveMember();
                handleAddMember();
            })
            .catch(err => {
                alert(err);
            })

        if (tempStatus !== taskStatus) {
            var status = {
                idTask: id,
                idStatus: taskStatus,
            }
            var result = updateStatus(status, user.userInfo.token);
            result
                .then(result => {

                })
                .catch(err => {
                    alert(err);
                })

        }
        date.setTime(date.getTime() - (7 * 60 * 60 * 1000));


    }

    const handleRemoveMember = () => {
        var memData = [];
        var memDelData = [];
        var data = [];
        member.forEach(x => {
            memData.push(x.idUser);
        })
        memberDelete.forEach(x => {
            memDelData.push(x.idUser);
        })
        memDelData.forEach(x => {
            if (!memData.includes(x)) {
                data.push(x);
            }
        })

        if (data.length > 0) {
            data.forEach(x => {
                var newData = {
                    IdTask: id,
                    IdUser: user.userInfo.idUser,
                    IdSth: x,
                }
                var result = removeTaskMembers(newData, user.userInfo.token);
                result
                    .then(result => {
                        console.log("deleted");
                    })
                    .catch(err => {
                        alert(err);
                    })

            })
        }

        handleReloadPage();
    }

    const handleAddMember = () => {
        var memData = [];
        var memDelData = [];
        var IdMember = [];

        member.forEach(x => {
            memData.push(x.idUser);
        })
        memberDelete.forEach(x => {
            memDelData.push(x.idUser);
        })
        memData.forEach(x => {
            if (!memDelData.includes(x)) {
                IdMember.push({
                    Id: x,
                });
            }
        })
        var data = {
            IdMember,
            IdTask: id,
            IdUser: user.userInfo.idUser,
        }

        if (data.IdMember.length > 0) {
            var result = addTaskMembers(data, user.userInfo.token);
            result
                .then(result => {
                    alert("updated");
                    handleReloadPage();
                })
                .catch(err => {
                    alert(err);
                })
        }
        else {
            alert("updated");
        }
    }



    return (
        <div className={styles.limiter}>

            <div className={styles.container}>
                {loading &&
                    <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                        <div className={styles.contentHeader}>
                            <h1>UPDATE TASK</h1>
                        </div>
                        <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                            <div className={styles.reloadBtn} onClick={() => { navigate(`/job/project/${location.state.projectId}`, { state: { idProject: location.state.projectId, idGroup: location.state.groupId } }, { replace: true }) }}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                            </div>
                        </div>
                        <div className={styles.taskContainer + ' ' + styles.nonBoxShadow}>
                            <form className={inputStyles.form}>
                                <span className={inputStyles.label}>
                                    Task's name:
                                </span>
                                <div className={inputStyles.inputContainer} style={{ marginLeft: '40px' }}>
                                    <input className={inputStyles.input} type="text" name="TaskName"
                                        value={taskName} onChange={handleTaskNameChange}
                                        placeholder="Enter your task's name..."
                                    />
                                </div>
                            </form>
                            <form className={inputStyles.form}>
                                <span className={inputStyles.label}>
                                    Task's deadline:
                                </span>
                                <div style={{ marginLeft: '22px', marginTop: '10px' }}>
                                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                        <DateTimePicker
                                            value={date}
                                            onChange={setDate}
                                            autoOk
                                            hideTabs
                                            ampm={false}
                                            allowKeyboardControl={false}
                                            disablePast
                                            leftArrowIcon={<AlarmIcon />}
                                            leftArrowButtonProps={{ "aria-label": "Prev month" }}
                                            rightArrowButtonProps={{ "aria-label": "Next month" }}
                                            rightArrowIcon={<SnoozeIcon />}
                                            InputProps={{
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton>
                                                            <AlarmIcon />
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </MuiPickersUtilsProvider>
                                </div>

                            </form>
                            <form className={inputStyles.form}>


                                <span className={inputStyles.label}>
                                    Task's content:
                                </span>
                                <div className={inputStyles.inputContainer} style={{ marginLeft: '22px' }}>
                                    <textarea className={inputStyles.input} name="TaskContent" cols="40" rows="6" value={taskContent} onChange={handleTaskContentChange}></textarea>
                                </div>
                            </form>
                            <form className={inputStyles.form}>


                                <span className={inputStyles.label}>
                                    Task's status:
                                </span>

                                <select className={inputStyles.inputContainer} style={{ marginLeft: '30px', marginTop: '10px' }} value={taskStatus} onChange={(e) => {
                                    const selectedStatus = e.target.value;
                                    setTaskStatus(selectedStatus);
                                }}>
                                    <option value="1">UNCOMPLETED</option>
                                    <option value="2">COMPLETED</option>
                                    <option value="3">BUG</option>
                                    <option value="4">EXPIRED</option>
                                </select>

                            </form>
                            <div className={inputStyles.memberContainer}>
                                <p className={inputStyles.label}>
                                    Members:
                                </p>
                                <div className={inputStyles.avatarContainer} id='selectedMemberContainer'>
                                    {member && member.map((item, index) => {
                                        return (
                                            <div className={inputStyles.avatarWrapper} key={index}>
                                                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row' }}>
                                                    <img src={`${API_URL}+${item.avatar}`} onError={handleErrorImg}
                                                        alt={item.name} className={inputStyles.avatar}
                                                        onMouseEnter={() => handleMouseEnterAvatar("userEmail" + item.idUser)}
                                                        onMouseLeave={() => handleMouseLeaveAvatar("userEmail" + item.idUser)}
                                                    />
                                                    <p id={"userEmail" + item.idUser} className={inputStyles.popup}>{item.mail}</p>
                                                </div>
                                                <button className={inputStyles.removeMemberBtn} onClick={() => onClickRemoveMember(item.mail)}>
                                                    <i className="fa-solid fa-circle-xmark"></i>
                                                </button>
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                            <div className={inputStyles.addMemberContainer}>
                                <button className={inputStyles.btnAddMember} onClick={handleOnClickAddMember}>
                                    Members
                                </button>
                            </div>
                        </div>
                        <div id='ListMember' className={inputStyles.listMember}>
                            <div className={styles.taskContainer + ' ' + styles.toolBar}>
                                {/* <div className={styles.reloadBtn}>
                                <span className={styles.reloadText}>Reload</span>
                                <i className="fas fa-redo"></i>
                            </div> */}
                                <div className={styles.search}>
                                    <input id='userSearchText' className={styles.searchInput} style={{ 'fontFamily': 'Poppins' }} placeholder="Enter name or email ..." />
                                    <div className={styles.searchBtn} onClick={handleSearchUser}>
                                        <span className={styles.searchText}>Search</span>
                                        <i className="fas fa-search"></i>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.taskContainer + ' ' + tableStyles.content}
                                style={{ 'overflowX': 'auto', 'margin': '0 auto', 'overflowY': 'auto' }}
                            >
                                <UserSelectList users={users} members={member} onCheckBoxChange={onCheckBoxChange} />
                            </div>
                        </div>
                    </div>
                }
            </div>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Alert"}
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you really want to update a task without update member?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAgree}>Agree</Button>
                    <Button onClick={handleClose} autoFocus>Cancel</Button>
                </DialogActions>
            </Dialog>
        </div>
    )

}

export default memo(UpdateTask);
