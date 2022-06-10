import { memo, useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css';
import inputStyles from '../InputStyles.module.css';
import UserSelectList from '../User/UserSelectList';
import { getUserByText } from '../../../asset/js/API/UserApi';
import { getProjectById, addProjectMembers, removeProjectMembers, editProject } from '../../../asset/js/API/ProjectApi';
import { getUserByProjectId } from '../../../asset/js/API/ProjectApi';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from "react-redux";

import { API_URL } from '../../../asset/js/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function UpdateProject(props) {
    const [member, setMember] = useState([]);
    const [users, setUsers] = useState([]);
    const [projectName, setProjectName] = useState("");
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [mail, setMail] = useState("");
    const [memberDelete, setMemberDelete] = useState([]);

    const user = useSelector((state) => state.users);

    let id = useParams().id;

    const [project, setProject] = useState({});

    useEffect(() => {
        getProjectById(id, user.userInfo.token)
            .then((result) => {
                if (result) {
                    setMail(result.mail);
                    setProject(result);
                    setProjectName(result.nameProject);
                    getUserByProjectId(result.idProject, user.userInfo.token)
                        .then((result1) => {
                            setMember(result1);
                            setUsers(result1);
                            setMemberDelete(result1);
                        })
                        .catch((err) => alert(err));
                }
                else {
                    navigate(`/myProjects`);
                }
            })
            .catch(() => navigate(`/myProjects`))
        setLoading(true);
    }, [])

    const handleReloadPage = () => {
        getProjectById(id, user.userInfo.token)
            .then((result) => {
                if (result) {
                    setMail(result.mail);
                    setProject(result);
                    setProjectName(result.nameProject);
                    getUserByProjectId(result.idProject, user.userInfo.token)
                        .then((result1) => {
                            setMember(result1);
                            setUsers(result1);
                            setMemberDelete(result1);
                        })
                        .catch((err) => alert(err));
                }
                else {
                    navigate(`/myProjects`);
                }
            })
            .catch(() => navigate(`/myProjects`))
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
                handleUpdateProject();
            }
            else {
                handleClickOpen();
            }
            // listMember.classList.remove(inputStyles.active);
            // e.target.innerText = 'Add member';
        }
        else {
            listMember.classList.add(inputStyles.active);
            e.target.innerText = 'Update project';
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

    const handleProjectNameChange = (e) => {
        setProjectName(e.target.value);
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
        handleUpdateProject();
    }

    const handleUpdateProject = () => {
        if (projectName.trim() === "") {
            alert("Project name must be enter");
            return;
        }
        var data = {
            IdUser: user.userInfo.idUser,
            IdProject: id,
            ProjectName: projectName.trim(),

        }
        var result = editProject(data, user.userInfo.token);
        result
            .then(result => {
                handleRemoveMember();
                handleAddMember();

            })
            .catch(err => {
                alert(err);
            })
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
                    IdProject: id,
                    IdUser: user.userInfo.idUser,
                    IdSth: x,
                }
                var result = removeProjectMembers(newData, user.userInfo.token);
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
            IdProject: id,
            IdUser: user.userInfo.idUser,
        }

        if (data.IdMember.length > 0) {
            var result = addProjectMembers(data, user.userInfo.token);
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
                            <h1>UPDATE PROJECT</h1>
                        </div>
                        <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                            <div className={styles.reloadBtn} onClick={() => { navigate("/job/myProjects", { replace: true }) }}>
                                <i className="fas fa-long-arrow-alt-left"></i>
                                <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                            </div>
                        </div>
                        <div className={styles.taskContainer + ' ' + styles.nonBoxShadow}>
                            <form className={inputStyles.form}>
                                <span className={inputStyles.label}>
                                    Project's name:
                                </span>
                                <div className={inputStyles.inputContainer}>
                                    <input className={inputStyles.input} type="text" name="projectName"
                                        value={projectName} onChange={handleProjectNameChange}
                                        placeholder="Enter your project's name..."
                                    />
                                </div>
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
                                                    <img src={`${API_URL}/${item.avatar}`} onError={handleErrorImg}
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
                        Are you really want to update a project without update member?
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

export default memo(UpdateProject);
