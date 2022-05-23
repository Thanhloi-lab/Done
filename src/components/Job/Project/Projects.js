import { memo } from 'react';
import styles from '../page.module.css'
import tableStyles from '../tableStyles.module.css'
import {Link} from 'react-router-dom';
import ProjectStyles from './Project.module.css'

function ProjectPage(props) {

    console.log("ProjectPage component rendered");


    return (
        <div className={styles.limiter}>
            <div className={styles.container}>
                <div className={styles.contentWrapper + ' ' + tableStyles.content}>
                    <div className={styles.contentHeader}>
                        <h1>PROJECTS</h1>
                    </div>
                    <div className={styles.taskContainer + ' ' + styles.toolBar}>
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

                    <div className={styles.taskContainer + ' ' + tableStyles.content} style={{'overflowX':'auto', 'margin':'0 auto'}}>
                        <table className={ProjectStyles.table100} >
                            <thead className={ProjectStyles.Table100Head}>
                                <tr>
                                    <th>Order</th>
                                    <th>Name</th>
                                    <th>Create User</th>
                                    <th>Date create</th>
                                    <th>Task</th>
                                </tr>
                            </thead>
                            <tbody className={ProjectStyles.Table100Body}>
                                <tr>
                                    <td>1</td>
                                    <td>Hello kitty</td>
                                    <td>cthanhloi2705@gmail.com</td>
                                    <td>23/5/2021</td>
                                    <td><Link to="/" className={tableStyles.LinkToProject}>5 tasks</Link></td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Hello kitty1</td>
                                    <td>cthanhloi2705@gmail.com</td>
                                    <td>23/5/2021</td>
                                    <td><Link to="/" className={tableStyles.LinkToProject}>5 tasks</Link></td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Hello kitty2</td>
                                    <td>cthanhloi2705@gmail.com</td>
                                    <td>23/5/2021</td>
                                    <td><Link to="/" className={tableStyles.LinkToProject}>5 tasks</Link></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default memo(ProjectPage);