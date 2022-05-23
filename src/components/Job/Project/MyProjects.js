import { memo } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import stylesBtn from './MyProject.module.css'
import { Link } from 'react-router-dom';

function MyProjectPage(props) {

    console.log("MyProjectPage component rendered");


    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>MY PROJECTS</h1>
                    </div>
                    <div className={stylesBtn.FeatureContainer}>
                        <div className={styles.taskContainer + ' ' + styles.toolBar
                             + ' ' + styles.nonBoxShadow + ' ' + tableStyles.content 
                             + ' ' + stylesBtn.FlexContainer}
                        >
                            <div className={stylesBtn.btnContainer}>
                                <Link className={stylesBtn.addBtn} to='/job/create-Project'>
                                    <i className="fa-solid fa-plus"></i>
                                    <span className={styles.addtext} style={{ marginLeft: '10px' }}>New Project</span>
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
                                    <th>Date create</th>
                                    <th>Tasks</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody className={stylesBtn.Table100Body}>
                                <tr>
                                    <td>1</td>
                                    <td>Hello kitty</td>
                                    <td>23/5/2021</td>
                                    <td><Link to="/" className={tableStyles.LinkToProject}>5 projects</Link></td>
                                    <td>
                                        <Link className={stylesBtn.deleteBtn} to='/'>
                                            <i className="fa-solid fa-trash-can"></i>
                                            <span className={stylesBtn.deleteText} style={{ marginLeft: '10px' }}>Delete</span>
                                        </Link>
                                        /
                                        <Link className={stylesBtn.editBtn} to='/'>
                                            <i className="fa-solid fa-pen-to-square"></i>
                                            <span className={stylesBtn.editText} style={{ marginLeft: '10px' }}>Edit</span>
                                        </Link>
                                    </td>
                                </tr>

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(MyProjectPage);