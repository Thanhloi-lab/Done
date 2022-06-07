import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyProject.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { allUserProject, deleteProject, editProject } from '../../../asset/js/API/ProjectApi';
import GroupDetail from '../Group/GroupDetail';
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

function MyProjectPage({ groupDetail, owner, ...props }) {
    console.log("projectPage component rendered " + owner);
    let navigate = useNavigate();
    let location = useLocation();
    const [projects, setProjects] = useState([]);
    const [fullProjects, setFullProjects] = useState([]);
    const [searchText, setSearchText] = useState('');

    const user = useSelector((state) => state.users);

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [projectEdit, setProjectEdit] = useState({ nameProject: '', idProject: 0 });
    const titleEdit = "Change project's name";
    const editContent = "Enter new project's name here to edit project's name";
    const titleDelete = "Delete project ";
    const deleteContent = "Deleting project will also delete project and task inside. Are you sure you want to delete?";


    useEffect(() => {
        getAllProject();
    }, [])

    const getAllProject = () => {
        var resultPromise = allUserProject(user.userInfo.idUser, user.userInfo.token);
        resultPromise.then((result) => {
            if (owner) {
                var temp = result.filter(x => x.createUser === user.userInfo.idUser);
                setFullProjects(temp);
                setProjects(temp);
                console.log(temp)
            }
            else {
                setFullProjects(result);
                setProjects(result);
            }

        })
            .catch((err) => console.log(err))
    }

    const handleLinkProjectDetail = (projectId, groupId, userCreate) => {
        if (userCreate === user.userInfo.iduser) {
            navigate(`/job/project/${projectId}`, {
                state: {
                    idProject: projectId,
                    idGroup: groupId,
                    createUser: userCreate
                }
            });
        }
        else {
            navigate(`/job/memberTasks/${projectId}`, {
                state: {
                    idProject: projectId,
                    idGroup: groupId,
                    createUser: userCreate
                }
            });
        }

    }

    const handleTextChange = (e) => {
        setSearchText(e.target.value);
        if (e.target.value.trim() !== '') {
            setProjects(fullProjects.filter(x => x.nameProject.toLowerCase().includes(e.target.value.trim().toLowerCase())))
        }
        else {
            setProjects(fullProjects);
        }
    }

    const handleReload = () => {
        getAllProject();
        setSearchText('');
    }

    const handleDeleteProject = () => {
        var data = {
            IdUser: user.userInfo.idUser,
            IdSth: projectEdit.idProject
        }
        var result = deleteProject(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setProjectEdit({ nameProject: '', idProject: 0 });
                getAllProject();
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

    const handleEditProject = (projectId) => {
        var data = {
            projectName: projectEdit.nameProject,
            IdUser: user.userInfo.idUser,
            IdProject: projectEdit.idProject
        }
        var result = editProject(data, user.userInfo.token);
        result.then(response => {
            if (response.isSuccessed) {
                setProjectEdit({ nameProject: '', idProject: 0 });
                getAllProject();
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
        navigate(`/job/update-project/${id}`);
        // console.log(id);
        // setprojectEdit({...projectEdit, idproject: id, nameproject:name});
        // setOpenDelete(false);
        // setOpenEdit(true);
        // setOpenDialog(true);
    };

    const handleClickDelete = (event, id, name) => {
        event.stopPropagation()
        setProjectEdit({ ...projectEdit, idProject: id, nameProject: name });
        setOpenDelete(true);
        setOpenEdit(false);
        setOpenDialog(true);
    };


    const handleClose = (event) => {
        setOpenDialog(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };

    const handleProjectNameChange = (e) => {
        setProjectEdit({ ...projectEdit, nameProject: e.target.value });
    }

    const handleActionModal = () => {
        if (openDelete) {
            handleDeleteProject();
        }
        else if (openEdit) {
            handleEditProject();
        }
    }

    const navigateListProject = (event, id) => {
        event.stopPropagation();
        navigate(`/job/${id}/Projects`);
    }
    const handleNavigateGroupDetail = (event, id) => {
        event.stopPropagation();
        navigate(`/job/group/${id}`);
    }

    const handleNavigateCreateProject = (event, id) => {
        event.stopPropagation();
        navigate(`/job/${id}/create-project`, {
            state: {
                groupId: id,
            }
        });
    }

    const DialogEdit = () => {
        return (
            <Dialog open={openDialog} onClose={handleClose}
                maxWidth='sm'
                fullWidth
            // PaperProps={{sx: { fontSize: '2rem !important' }}}
            >
                <DialogTitle><span style={{ fontSize: '2.5rem' }}>{openEdit && titleEdit}{openDelete && titleDelete + projectEdit.nameProject}</span></DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        <span style={{ fontSize: '2rem' }}>{openEdit && editContent}{openDelete && deleteContent}</span>
                    </DialogContentText>
                    {openEdit &&
                        <TextField
                            autoFocus
                            margin="dense"
                            id="newProjectName"
                            label="project's name"
                            type="text"
                            value={projectEdit.nameProject}
                            onChange={handleProjectNameChange}
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
                        <h1>{!groupDetail && (owner ? 'MY PROJECTS' : 'PROJECTS')} {groupDetail && 'GROUP DETAIL'}</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <div className={styles.reloadBtn} onClick={() => { navigate("/job/myGroups", { replace: true }) }}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </div>
                    </div>

                    <div className={stylesBtn.FeatureContainer}>
                        {groupDetail && owner &&
                            <div className={styles.taskContainer + ' ' + styles.toolBar
                                + ' ' + styles.nonBoxShadow + ' ' + tableStyles.content
                                + ' ' + stylesBtn.FlexContainer}
                            >
                                <div className={stylesBtn.btnContainer}>
                                    <div className={stylesBtn.addBtn} style={{ marginRight: '30px' }} onClick={(event) => handleNavigateCreateProject(event, location.state.idGroup)}>
                                        <i className="fa-solid fa-plus"></i>
                                        <span className={styles.addtext} style={{ marginLeft: '10px' }}>New project</span>
                                    </div>
                                </div>
                            </div>
                        }
                        <div className={styles.taskContainer + ' ' + stylesBtn.searchContainer} style={{ flex: !groupDetail ? 1 : 'inherit' }}>
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
                                    {!groupDetail &&
                                        <th>Group</th>
                                    }
                                    <th>Name</th>
                                    <th>Creator's mail</th>
                                    <th>Tasks</th>
                                    {owner && <th></th>}
                                </tr>
                            </thead>
                            <tbody className={stylesBtn.Table100Body}>

                                {projects && projects.map((x, index) => {
                                    return (
                                        <tr key={x.idProject} style={{ cursor: 'pointer' }} onClick={(s, e) => {
                                            s.stopPropagation();
                                            handleLinkProjectDetail(x.idProject, x.idGroup, x.createUser);
                                        }}>
                                            <td>{index + 1}</td>
                                            {!groupDetail &&
                                                <td>
                                                    <div className={stylesBtn.editBtn} onClick={(event) => handleNavigateGroupDetail(event, x.idGroup)}>
                                                        <span className={stylesBtn.editText} style={{ marginLeft: '10px' }}>{x.idGroup}</span>
                                                    </div>
                                                </td>
                                            }
                                            <td>{x.nameProject}</td>
                                            <td>{x.mail}</td>
                                            <td >
                                                <div>
                                                    {x.cntTask} tasks
                                                </div>
                                            </td>
                                            {owner &&
                                                <td>
                                                    <div className={stylesBtn.deleteBtn} onClick={(event) => handleClickDelete(event, x.idProject, x.nameProject)} >
                                                        <i className="fa-solid fa-trash-can"></i>
                                                        <span className={stylesBtn.deleteText} style={{ marginLeft: '10px' }}>Delete</span>
                                                    </div>
                                                    {/* onClick={(s, e) => handleDeleteproject(x.idproject)} */}
                                                    /
                                                    <div className={stylesBtn.editBtn} onClick={(event) => handleClickEdit(event, x.idProject, x.nameProject)}>
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

export default memo(MyProjectPage);
