export const EXPIRED_TAB = '/job/expired';
export const HOME_JOB = '/job';
export const BUG_TAB = '/job/bug';
export const COMPLETED_TAB = '/job/completed';
export const UNCOMPLETED_TAB = '/job/uncompleted';
export const TASK_DETAIL = '/job/task/:id';

export const GROUPS = '/job/groups';
export const MY_GROUP = '/job/myGroups';
export const UPDATE_GROUP = '/job/update-group/:id';
export const CREATE_GROUP = '/job/create-group';
export const GROUP_DETAIL = '/job/group/:id';

export const PROJECTS = '/job/Projects';
export const MY_PROJECTS = '/job/myProjects';
export const UPDATE_PROJECTS = '/job/update-project/:id';
export const CREATE_PROJECTS = '/job/:id/create-project';
export const PROJECT_DETAIL = '/job/project/:id';

export const FORGOT_PASSWORD = '/forgot-password';
export const SIGN_IN = '/sign-in';
export const SIGN_UP = '/sign-up';

export const API_URL = 'http://192.168.0.103:50003'


export const STATUS = {
    COMPLETED: 'completed',
    UNCOMPLETED: 'unCompleted',
    EXPIRED: 'expired',
    BUG: 'bug'
};

export const STATUS_ID = {
    0: 'DELETED',
    1: 'UNCOMPLETED',
    2: 'COMPLETED',
    3: 'BUG',
    4: 'EXPIRED'
}

export const STATUS_NAME = {
    'DELETED': 0,
    'UNCOMPLETED' : 1,
    'COMPLETED' : 2,
    'BUG': 3,
    'EXPIRED' : 4
}

export const JOB_BAR_STATUS = [
    {job:'completedJobs', task:'completedTask'},
    {job:'unCompletedJobs', task:'unCompletedTask'},
    {job:'expiredJobs', task:'expiredTask'},
    {job:'bugJobs', task:'bugTask'}
]


