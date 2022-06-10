import { memo, useState } from 'react';
import Button from '@mui/material/Button';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css';
import inputStyles from '../InputStyles.module.css';
import UserSelectList from '../User/UserSelectList';
import { getUserByText } from '../../../asset/js/API/UserApi';
import { createGroup } from '../../../asset/js/API/GroupApi';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';

import { API_URL } from '../../../asset/js/constant';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CreateGroup(props) {
    const [member, setMember] = useState([]);
    const [users, setUsers] = useState([]);
    const [groupName, setGroupName] = useState("");
    const [open, setOpen] = useState(false);
    const user = useSelector((state) => state.users);
    const navigate = useNavigate();

    const handleSearchUser = () => {
        var searchText = document.getElementById('userSearchText').value;
        if (searchText !== "") {
            getUserByText(searchText)
                .then((result) => {
                    //myid BUG
                    setUsers(result.filter(x => x.idUser !== user.userInfo.idUser));
                })
                .catch((err) => console.log(err));
        }
    }

    const handleOnClickAddMember = (e) => {
        const listMember = document.getElementById('ListMember');
        if (listMember.classList.contains(inputStyles.active)) {
            if (member.length > 0) {
                handleCreateGroup();
            }
            else {
                handleClickOpen();
            }
            // listMember.classList.remove(inputStyles.active);
            // e.target.innerText = 'Add member';
        }
        else {
            listMember.classList.add(inputStyles.active);
            e.target.innerText = 'Create group';
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
        const checkBox = document.getElementById(id);
        console.log(checkBox)
        if (checkBox) {
            checkBox.checked = false;
        }
        const newState = member.filter((item) => item.mail !== id);
        setMember(newState);
    }

    const handleMouseEnterAvatar = (id) => {
        const email = document.getElementById(id);
        email.setAttribute('style', 'visibility:visible;')
    }

    const handleMouseLeaveAvatar = (id) => {
        const email = document.getElementById(id);
        email.setAttribute('style', 'visibility:hidden;')
    }

    const handleGroupNameChange = (e) => {
        setGroupName(e.target.value);
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
        handleCreateGroup();
        setOpen(false);
    }

    const handleCreateGroup = () => {
        if (groupName.trim() === "") {
            alert("Group name must be enter");
            return;
        }
        var data = {
            NameGroup: groupName.trim(),
            IdUser: user.userInfo.idUser,
            Users: []
        }
        member.forEach(x => {
            data.Users.push(x.idUser);
        })

        var result = createGroup(data, user.userInfo.token);
        result
            .then(result => {
                alert("Created!");
            })
            .catch(err => {
                alert(err);
            })
        setGroupName("");
        setMember([]);
    }


    return (
        <div className={styles.limiter}>

            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>CREATE GROUP</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <div className={styles.reloadBtn} onClick={() => { navigate("/job/myGroups", { replace: true }) }}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </div>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.nonBoxShadow}>
                        <form className={inputStyles.form}>
                            <span className={inputStyles.label}>
                                Group's name:
                            </span>
                            <div className={inputStyles.inputContainer}>
                                <input className={inputStyles.input} type="text" name="groupName"
                                    value={groupName} onChange={handleGroupNameChange}
                                    placeholder="Enter your group's name..."
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
                                Add member
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
                        <span style={{ fontSize: '2rem' }}>Are you really want to create a group without member?</span>
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

export default memo(CreateGroup);
