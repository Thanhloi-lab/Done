import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyGroup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { allUserGroup, deleteGroup, editGroup } from '../../../asset/js/API/GroupApi';
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

function MyGroupPage({ owner, ...props }) {
    console.log("GroupPage component rendered " + owner);
    let navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [fullGroups, setFullGroups] = useState([]);
    const [searchText, setSearchText] = useState('');

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [groupEdit, setGroupEdit] = useState({ nameGroup: '', idGroup: 0 });
    const titleEdit = "Change group's name";
    const editContent = "Enter new group's name here to edit group's name";
    const titleDelete = "Delete group ";
    const deleteContent = "Deleting group will also delete project and task inside. Are you sure you want to delete?";

    const user = useSelector((state) => state.users);
    //console.log(user)

    useEffect(() => {
        getAllGroup();
    }, [])

    const getAllGroup = () => {
        var resultPromise = allUserGroup(user.userInfo.idUser, user.userInfo.token);
        resultPromise.then((result) => {
            if (owner) {
                var temp = result.filter(x => x.createUser === user.userInfo.idUser);
                setFullGroups(temp);
                setGroups(temp);
            }
            else {
                setFullGroups(result);
                setGroups(result);
            }

        })
            .catch((err) => console.log(err))
    }

    const handleLinkGroupDetail = (groupId, idUser) => {
        if (idUser === user.userInfo.idUser) {
            navigate(`/job/group/${groupId}`, {
                state: {
                    idGroup: groupId,
                }
            });
        }
        else {
            navigate(`/job/memberProjects/${groupId}`, {
                state: {
                    idGroup: groupId,
                }
            });
        }
    }

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.trim() !== '') {
            setGroups(fullGroups.filter(x => x.nameGroup.toLowerCase().includes(e.target.value.trim().toLowerCase())))
        }
        else {
            setGroups(fullGroups);
        }
    }

    const handleReload = () => {
        getAllGroup();
        setSearchText('');
    }

    const handleDeleteGroup = () => {
        var data = {
            IdUser: user.userInfo.idUser,
            IdSth: groupEdit.idGroup
        }
        var result = deleteGroup(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setGroupEdit({ nameGroup: '', idGroup: 0 });
                getAllGroup();
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

    const handleEditGroup = (groupId) => {
        var data = {
            GroupName: groupEdit.nameGroup,
            IdUser: user.userInfo.idUser,
            IdGroup: groupEdit.idGroup
        }
        var result = editGroup(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setGroupEdit({ nameGroup: '', idGroup: 0 });
                getAllGroup();
                handleClose();
                alert(response.resultObject);
            }
            else {
                alert(response.message);
            }
        })
            .catch(err => {
                alert("Sửa thất bại")
            })
    }

    const handleClickEdit = (event, id, name) => {
        event.stopPropagation()
        navigate(`/job/update-group/${id}`);
        // console.log(id);
        // setGroupEdit({...groupEdit, idGroup: id, nameGroup:name});
        // setOpenDelete(false);
        // setOpenEdit(true);
        // setOpenDialog(true);
    };

    const handleClickDelete = (event, id, name) => {
        event.stopPropagation()
        setGroupEdit({ ...groupEdit, idGroup: id, nameGroup: name });
        setOpenDelete(true);
        setOpenEdit(false);
        setOpenDialog(true);
    };


    const handleClose = (event) => {
        setOpenDialog(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };

    const handleGroupNameChange = (e) => {
        setGroupEdit({ ...groupEdit, nameGroup: e.target.value });
    }

    const handleActionModal = () => {
        if (openDelete) {
            handleDeleteGroup();
        }
        else if (openEdit) {
            handleEditGroup();
        }
    }

    const navigateListProject = (event, id) => {
        event.stopPropagation()
        navigate(`/job/${id}/Projects`);
    }

    const DialogEdit = () => {
        return (
            <Dialog open={openDialog} onClose={handleClose}
                maxWidth='sm'
                fullWidth
            // PaperProps={{sx: { fontSize: '2rem !important' }}}
            >
                <DialogTitle><span style={{ fontSize: '2.5rem' }}>{openEdit && titleEdit}{openDelete && titleDelete + groupEdit.nameGroup}</span></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontSize: '2rem' }}>{openEdit && editContent}{openDelete && deleteContent}</span>
                    </DialogContentText>
                    {openEdit &&
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newGroupName"
                            label="Group's name"
                            type="text"
                            value={groupEdit.nameGroup}
                            onChange={handleGroupNameChange}
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
                        <h1>{owner ? 'MY GROUPS' : 'GROUPS'}</h1>
                    </div>
                    <div className={stylesBtn.FeatureContainer}>
                        {owner &&
                            <div className={styles.taskContainer + ' ' + styles.toolBar
                                + ' ' + styles.nonBoxShadow + ' ' + tableStyles.content
                                + ' ' + stylesBtn.FlexContainer}
                            >
                                <div className={stylesBtn.btnContainer}>
                                    <Link className={stylesBtn.addBtn} to='/job/create-group'>
                                        <i className="fa-solid fa-plus"></i>
                                        <span className={styles.addtext} style={{ marginLeft: '10px' }}>New group</span>
                                    </Link>
                                </div>
                            </div>
                        }
                        <div className={styles.taskContainer + ' ' + stylesBtn.searchContainer} style={{ flex: !owner ? 1 : 'inherit' }}>
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
                                    <th>Creator's mail</th>
                                    <th>Projects</th>
                                    {owner && <th></th>}
                                </tr>
                            </thead>
                            <tbody className={stylesBtn.Table100Body}>

                                {groups && groups.map((x, index) => {
                                    return (
                                        <tr key={x.idGroup} style={{ cursor: 'pointer' }} onClick={(s, e) => {
                                            s.stopPropagation();
                                            handleLinkGroupDetail(x.idGroup, x.createUser);
                                        }}>
                                            <td>{index + 1}</td>
                                            <td>{x.nameGroup}</td>
                                            <td>{x.mail}</td>
                                            <td >
                                                <div>
                                                    {x.cntProject} projects
                                                </div>
                                            </td>
                                            {owner &&
                                                <td>
                                                    <div className={stylesBtn.deleteBtn} onClick={(event) => handleClickDelete(event, x.idGroup, x.nameGroup)} >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <span className={stylesBtn.deleteText} style={{ marginLeft: '10px' }}>Delete</span>
                                                    </div>
                                                    {/* onClick={(s, e) => handleDeleteGroup(x.idGroup)} */}
                                                    /
                                                    <div className={stylesBtn.editBtn} onClick={(event) => handleClickEdit(event, x.idGroup, x.nameGroup)}>
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

export default memo(MyGroupPage);
