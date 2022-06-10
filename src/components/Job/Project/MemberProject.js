import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyProject.module.css'
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { allUserProject, deleteProject, editProject, allProjectByGroupId } from '../../../asset/js/API/ProjectApi';
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

function MemberProject({ groupDetail, owner, ...props }) {
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
        var resultPromise = allProjectByGroupId(location.state.idGroup, user.userInfo.token);
        resultPromise.then((result) => {


            setFullProjects(result);
            setProjects(result);
            console.log(result)



        })
            .catch((err) => console.log(err))
    }

    const handleLinkProjectDetail = (projectId, groupId, user) => {
        navigate(`/job/memberTasks/${projectId}`, {
            state: {
                idProject: projectId,
                idGroup: groupId,
                createUser: user
            }
        });
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








    const handleClose = (event) => {
        setOpenDialog(false);
        setOpenEdit(false);
        setOpenDelete(false);
    };




    const handleNavigateGroupDetail = (event, id) => {
        event.stopPropagation();
        navigate(`/job/group/${id}`);
    }






    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MEMBER PROJECTS</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar + ' ' + styles.nonBoxShadow}>
                        <div className={styles.reloadBtn} onClick={() => { navigate("/job/groups", { replace: true }) }}>
                            <i className="fas fa-long-arrow-alt-left"></i>
                            <span className={styles.reloadText} style={{ marginLeft: '10px' }}>Back</span>
                        </div>
                    </div>

                    <div className={stylesBtn.FeatureContainer}>

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

export default memo(MemberProject);
