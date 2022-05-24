export const EXPIRED_TAB = '/job/expired';
export const HOME_JOB = '/job';
export const BUG_TAB = '/job/bug';
export const COMPLETED_TAB = '/job/completed';
export const UNCOMPLETED_TAB = '/job/uncompleted';
export const GROUPS = '/job/groups';
export const MY_GROUP = '/job/myGroups';
export const MY_PROJECTS = '/job/myProjects';
export const PROJECTS = '/job/Projects';
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


