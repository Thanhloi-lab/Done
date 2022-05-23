import { memo, useEffect, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyGroup.module.css'
import { Link, useNavigate } from 'react-router-dom';
import { allUserGroup } from '../../../asset/js/API/GroupApi';

//mui
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function MyGroupPage(props) {
    console.log("MyGroupPage component rendered");
    let navigate = useNavigate();
    const [groups, setGroups] = useState([]);
    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

    useEffect(() => {
        const getAllGroup = () => {
            var resultPromise = allUserGroup(2);
            resultPromise.then((result) => {
                console.log(result);
                setGroups(result);
            })
                .catch((err) => console.log(err))
        }
        getAllGroup();
    }, [])


    const handleLinkGroupDetail = (groupId) => {

        navigate(`/groupDetail/${groupId}`);
    }

    const handleDeleteGroup = (groupId) => {

    }

    const handleEditGroup = (groupId) => {

    }

    const handleClickOpen = (event) => {
        event.stopPropagation()
        setOpenEdit(true);
    };

    const handleClose = (event) => {
       
        setOpenEdit(false);
    };

    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MY GROUPS</h1>
                    </div>
                    <div className={stylesBtn.FeatureContainer}>
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
                        <div className={styles.taskContainer + ' ' + stylesBtn.searchContainer}>
                            <div className={styles.toolBar}>
                                <div className={styles.reloadBtn}>
                                    <span className={styles.reloadText}>Reload</span>
                                    <i className="fas fa-redo"></i>
                                </div>
                                <div className={styles.search}>
                                    <input className={styles.searchInput} />
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
                                    <th>Creator's phone</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={stylesBtn.Table100Body}>

                                {groups && groups.map((x, index) => {
                                    return (
                                        <tr key={x.idGroup} style={{ cursor: 'pointer' }} onClick={(s, e) => {
                                            s.stopPropagation();
                                            handleLinkGroupDetail(x.idGroup);
                                        }}>
                                            <td>{index + 1}</td>
                                            <td>{x.nameGroup}</td>
                                            <td>{x.mail}</td>
                                            <td>{x.phone}</td>
                                            <td>
                                                <div className={stylesBtn.deleteBtn} onClick={(s, e) => handleDeleteGroup(x.idGroup)}>
                                                    <i className="fa-solid fa-trash-can"></i>
                                                    <span className={stylesBtn.deleteText} style={{ marginLeft: '10px' }}>Delete</span>
                                                </div>
                                                /
                                                <div className={stylesBtn.editBtn} onClick={(event) => handleClickOpen(event)}>
                                                    <i className="fa-solid fa-pen-to-square"></i>
                                                    <span className={stylesBtn.editText} style={{ marginLeft: '10px' }}>Edit</span>
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

            <Dialog open={openEdit} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Enter new group's name here to edit group's name
                    </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="newGroupName"
                        label="Group's name"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleClose}>Edit</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default memo(MyGroupPage);
