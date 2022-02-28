import { STATUS_NAME, STATUS_ID } from './constant'

function groupByProjectStatus(list) {
    const map = new Map();
    list.forEach(item => {
        const key = item.idProject;
        const collection = map.get(key);
        if (!collection) {
            map.set(key, [item]);
        }
        else {
            collection.push(item);
        }
    });
    return Array.from(map, ([idProject, value]) => ({ idProject, value }));
}

async function handleLoadAllTasks(id) {
    const all = { allTasks: {} }
    let response = await fetch(`https://localhost:50001/api/Tasks/allTaskOf?Id=${id}`);
    let data = await response.json();
    all.allTasks = {
        completedJobs: groupByProjectStatus(data.filter(job => {
            return job.statusId === STATUS_NAME.COMPLETED
        })),
        unCompletedJobs: groupByProjectStatus(data.filter(job => {
            return job.statusId === STATUS_NAME.UNCOMPLETED
        })),
        bugJobs: groupByProjectStatus(data.filter(job => {
            return job.statusId === STATUS_NAME.BUG
        })),
        expiredJobs: groupByProjectStatus(data.filter(job => {
            return job.statusId === STATUS_NAME.EXPIRED
        }))
    }

    return all;
}

const getArrayTaskFromObject = (obj, id) => {
    const jobs = Object.values(obj);
    let detail;
    jobs.forEach(map => {
        map.forEach(projects => {
            projects.value.forEach(project => {
                if (project.idTask + "" === id) {
                    detail = project;
                }
                if(detail)
                    return;
            })
            if(detail)
                    return;
        })
        if(detail)
                    return;
    })
    return detail;
}

export { handleLoadAllTasks, groupByProjectStatus, getArrayTaskFromObject}