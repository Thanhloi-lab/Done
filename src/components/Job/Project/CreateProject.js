import { memo, useState } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import inputStyles from '../InputStyles.module.css'

function CreateProject(props) {
    const [member, setMember] = useState([]);

    const handleOnClickAddMember = (e) => {
        const listMember = document.getElementById('ListMember');
        if (listMember.classList.contains(inputStyles.active)) {
            listMember.classList.remove(inputStyles.active);
            e.target.innerText = 'Add member';
        }
        else {
            listMember.classList.add(inputStyles.active);
            e.target.innerText = 'Create Project';
        }
    }

    const onCheckBoxChange = (id) => {
        const checkBox = document.getElementById(id);
        if (checkBox.checked) {
            var user = {
                IdUser: id,
                Name: checkBox.getAttribute('Name'),
                Email: checkBox.getAttribute('Email')
            }
            setMember([...member, user]);
            const avatar = (
                <div className={inputStyles.avatarWrapper}>
                    <img src="/images/penguin2.png" alt={user.Name} className={inputStyles.avatar} />
                    <button className={inputStyles.removeMemberBtn} onClick={() => onClickRemoveMember(user.IdUser)}>
                        <i className="fa-solid fa-circle-xmark"></i>
                    </button>
                </div>
            )
        }
        else {
            const newState = member.filter((item) => item.IdUser !== id);
            setMember(newState);
        }

    }
    const onClickRemoveMember = (id) => {
        const checkBox = document.getElementById(id);
        checkBox.checked=false;
        const newState = member.filter((item) => item.IdUser !== id);
        setMember(newState);
    }

    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>CREATE Project</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.nonBoxShadow}>
                        <form className={inputStyles.form}>
                            <span className={inputStyles.label}>
                                Project's name:
                            </span>
                            <div className={inputStyles.inputContainer}>
                                <input className={inputStyles.input} type="text" name="ProjectName"
                                    placeholder="Enter your Project's name..."
                                />
                            </div>
                        </form>
                        <div className={inputStyles.memberContainer}>
                            <p className={inputStyles.label}>
                                Members:
                            </p>
                            <div className={inputStyles.avatarContainer} id='selectedMemberContainer'>
                                {member.map((item) => {
                                    return (
                                        <div className={inputStyles.avatarWrapper} key={item.UserId}>
                                            <img src="/images/penguin2.png" alt={item.Name} className={inputStyles.avatar} />
                                            <button className={inputStyles.removeMemberBtn} onClick={() => onClickRemoveMember(item.IdUser)}>
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
                            <div className={styles.reloadBtn}>
                                <span className={styles.reloadText}>Reload</span>
                                <i className="fas fa-redo"></i>
                            </div>
                            <div className={styles.search}>
                                <input className={styles.searchInput} style={{ 'fontFamily': 'Poppins' }} placeholder="Enter name or email ..." />
                                <div className={styles.searchBtn}>
                                    <span className={styles.searchText}>Search</span>
                                    <i className="fas fa-search"></i>
                                </div>
                            </div>
                        </div>
                        <div className={styles.taskContainer + ' ' + tableStyles.content}
                            style={{ 'overflowX': 'auto', 'margin': '0 auto', 'overflowY': 'auto' }}
                        >

                            <table className={tableStyles.table100} >
                                <thead className={tableStyles.Table100Head}>
                                    <tr>
                                        <th>Select</th>
                                        <th>Name</th>
                                        <th>Email</th>
                                    </tr>
                                </thead>
                                <tbody className={tableStyles.Table100Body}>
                                    <tr>
                                        <td>
                                            <input className={inputStyles.checkBox}
                                                type="checkbox"
                                                email='nigga@gmail.com'
                                                name='Hello kitty'
                                                id='id1'
                                                onClick={() => onCheckBoxChange('id1')}
                                            />
                                        </td>
                                        <td>Hello kitty</td>
                                        <td>nigga@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className={inputStyles.checkBox}
                                                type="checkbox"
                                                email='nigga1@gmail.com'
                                                name='Hello kitty1'
                                                id='id2'
                                                onClick={() => onCheckBoxChange('id2')}
                                            />
                                        </td>
                                        <td>Hello kitty1</td>
                                        <td>nigga1@gmail.com</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <input className={inputStyles.checkBox}
                                                type="checkbox"
                                                email='nigga2@gmail.com'
                                                name='Hello kitty2'
                                                id='id3'
                                                onClick={() => onCheckBoxChange('id3')}
                                            />
                                        </td>
                                        <td>Hello kitty2</td>
                                        <td>nigg2@gmail.com</td>
                                    </tr>

                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )

}

export default CreateProject;
