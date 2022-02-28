const EXPIRED_TAB = '/job/expired'
const HOME_JOB = '/job';
const BUG_TAB = '/job/bug';
const COMPLETED_TAB = '/job/completed';
const UNCOMPLETED_TAB = '/job/uncompleted';
const GROUPS = '/job/groups';
const MY_GROUP = '/job/myGroups'
const STATUS = {
    COMPLETED: 'completed',
    UNCOMPLETED: 'unCompleted',
    EXPIRED: 'expired',
    BUG: 'bug'
};

const STATUS_ID = {
    0: 'DELETED',
    1: 'UNCOMPLETED',
    2: 'COMPLETED',
    3: 'BUG',
    4: 'EXPIRED'
}

const STATUS_NAME = {
    'DELETED': 0,
    'UNCOMPLETED' : 1,
    'COMPLETED' : 2,
    'BUG': 3,
    'EXPIRED' : 4
}


export {HOME_JOB}; 
export {BUG_TAB};
export {COMPLETED_TAB};
export {UNCOMPLETED_TAB};
export {GROUPS}
export {MY_GROUP}
export {EXPIRED_TAB}
export {STATUS_ID , STATUS_NAME, STATUS}
