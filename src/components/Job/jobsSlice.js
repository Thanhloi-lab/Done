
import {createSlice} from '@reduxjs/toolkit';
import {HOME_JOB} from '../../asset/js/constant'

const jobsSlice = createSlice({
    name:'jobs',
    initialState:{
        path:HOME_JOB,
        allTasks:{},
        sideBarStatus:true,
        homeActions:{
            completedJobs:{show:false, projectId:[]},
            unCompletedJobs:{show:false, projectId:[]},
            expiredJobs:{show:false, projectId:[]},
            bugJobs:{show:false, projectId:[]},
        },
        completedJobsAction:{show:false, projectId:[]},
        unCompletedJobsAction:{show:false, projectId:[]},
        expiredJobsAction:{show:false, projectId:[]},
        bugJobsAction:{show:false, projectId:[]},
    },
    reducers:{
        changeTab: (state, action) =>{
            state.path = action.payload.path;
        },
        getAllTasks:(state, action)=>{
            state.allTasks = action.payload.allTasks
        },
        toggleSideBar:(state)=>{
            state.sideBarStatus = !state.sideBarStatus
        },
        setHomeActions:(state, action)=>{
            function removeElement(array, elem) {
                var index = array.indexOf(elem);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
            if(!state.homeActions[action.payload.projectStatus].projectId.includes(action.payload.idProject)){
                state.homeActions[action.payload.projectStatus].projectId.push(action.payload.idProject);
            }
            else{
                removeElement(state.homeActions[action.payload.projectStatus].projectId, action.payload.idProject)
            }
        },
        setHomeActionsWidest:(state, action)=>{
            state.homeActions[action.payload.projectStatus].show = !state.homeActions[action.payload.projectStatus].show;
        },
        setJobStatusAction:(state, action)=>{
            function removeElement(array, elem) {
                var index = array.indexOf(elem);
                if (index > -1) {
                    array.splice(index, 1);
                }
            }
            if(!state[action.payload.projectStatus].projectId.includes(action.payload.idProject)){
                state[action.payload.projectStatus].projectId.push(action.payload.idProject);
            }
            else{
                removeElement(state[action.payload.projectStatus].projectId, action.payload.idProject)
            }
        },
        setJobActionsWidest:(state, action)=>{
            state[action.payload.projectStatus].show = !state[action.payload.projectStatus].show;
        }
    }
});

export default jobsSlice;