// import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styles from './page.module.css';
import jobsSlice from './jobsSlice'
import { useDispatch } from 'react-redux';

function JobBar(props) {

    const dispatch = useDispatch();

    const handleWrap = (id, isShow) => {
        const wrapper = document.getElementById(id);
        const btn = document.getElementById(id + 'Btn');
        try {
            if(isShow) {
                handleShow(wrapper, btn);
            }
            else{
                handleHide(wrapper, btn, id);
            }
        }   
        catch (e) {
            console.log(e)
            return
        }

    }

    const handleShow = (wrapper, btn) =>{
        if (!wrapper.classList.contains(styles.active)) {
            wrapper.classList.add(styles.active);
            btn.classList.add(styles.rotateBtn);
        }
    }

    const handleHide = (wrapper, btn, id)=>{
        if (wrapper.classList.contains(styles.active) && btn.classList.contains(styles.rotateBtn)) {
            const childs = document.querySelectorAll('#' + id + " ." + styles.listProject);
            childs.forEach((child) => {
                child.classList.remove(styles.active);
            })
            const childBtn = wrapper.childNodes;
            childBtn.forEach((child) => {
                if (child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn)) {
                    child.querySelector('.fas.fa-chevron-down.' + styles.rotateBtn).classList.remove(styles.rotateBtn);
                }
            })

            wrapper.classList.remove(styles.active);
            btn.classList.remove(styles.rotateBtn);
        }
    }

    const handleOnClickWrapAll = (id)=>{
        const state = {
            projectStatus: id
        }
        dispatch(jobsSlice.actions.setHomeActionsWidest(state));
    }

    const handleOnClickWrapProject = (idProject, projectStatus)=>{
        const state = {
            idProject,
            projectStatus
        }
        dispatch(jobsSlice.actions.setHomeActions(state));
    }

    return (
        <div className={styles.taskContainer}>
            <div className={styles[props.status]}>
                <span className={styles.projectHeader}>{props.title}</span>
                <span className={styles.wrapBtn} onClick={() => {
                    handleOnClickWrapAll(props.status + 'Jobs')
                }}>
                    <i className={props.action.show === true ?
                        'fas fa-chevron-down ' + styles.rotateBtn : 'fas fa-chevron-down'}
                        id={`${props.status}JobsBtn`}>
                    </i>
                </span>
            </div>

            <ul className={
                props.action.show === true ? styles.listProject
                    + ' ' + styles.active : styles.listProject} id={props.status + "Jobs"}
            >
                {props.list && props.list.map(project => {
                    return (
                        <li key={project.idProject}>
                            <div className={styles.projectContainer}>
                                <span className={styles.projectTitle}>Project: {project.value[0].nameProject}</span>
                                <span className={styles.wrapBtn} onClick={() => {
                                    handleOnClickWrapProject(project.idProject, props.status+"Jobs")
                                }}>
                                    <i className={props.action.show &&
                                        props.action.projectId.includes(project.idProject) ? styles.rotateBtn + " fas fa-chevron-down" : 'fas fa-chevron-down'}
                                        id={`${props.status}'Task'${project.idProject}"Btn"`}
                                    >
                                    </i>
                                </span>
                            </div>
                            <ul className={props.action.show &&
                                props.action.projectId.includes(project.idProject) ?
                                styles.active + ' ' + styles.listProject : styles.listProject}
                                id={`${props.status}${project.idProject}`}
                            >
                                {project.value && project.value.map((job) => {
                                    return (
                                        <li className={styles.projectItem} key={job.idTask}>
                                            <p className={styles.taskName}>{job.nameTask}</p>
                                            <Link to={'/job/' + job.idTask} className={styles[`${props.status}Arrow`]}>
                                                <i className="fas fa-chevron-right"></i>
                                            </Link>
                                        </li>
                                    )
                                })}
                            </ul>
                        </li>
                    )
                })}
            </ul>
        </div>
    )
}

export default JobBar;