import { API_URL } from '../constant';

export async function allTaskOfUser(id, token) {
    let response = await fetch(`${API_URL}/api/Tasks/allTaskOf?Id=${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
    let data = await response.json();
    return data;
};

export async function createTask(data, token) {
    // Default options are marked with *
    console.log(JSON.stringify(data))
    // console.log(data)

    const response = await fetch(`${API_URL}/api/Tasks/create`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    //console.log(response.json())
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function editTask(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${API_URL}/api/Tasks/Edit`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function updateStatus(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${API_URL}/api/Tasks/updateStatus`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function deleteTask(data, token) {
    // Default options are marked with *
    const response = await fetch(`${API_URL}/api/Tasks/removeTask`, {
        method: 'PUT', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    //console.log(response.json());
    return response.json(); // parses JSON response into native JavaScript objects
}




export async function getUserByTaskId(id, token) {
    let response = await fetch(`${API_URL}/api/Tasks/allMembers?Id=${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
    let data = await response.json();
    return data;
};

export async function getTaskById(id, token) {
    let response = await fetch(`${API_URL}/api/Tasks/getById?Id=${id}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
    let data = await response.json();
    return data;
};


export async function addTaskMembers(data, token) {
    // Default options are marked with *
    console.log(data);
    const response = await fetch(`${API_URL}/api/Tasks/addMember`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function removeTaskMembers(data, token) {
    // Default options are marked with *
    //console.log(data);
    const response = await fetch(`${API_URL}/api/Tasks/removeMember`, {
        method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
            // 'Content-Type': 'application/x-www-form-urlencoded',
            //Thêm token ở đây nha gái
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(data) // body data type must match "Content-Type" header
    });
    return response.json(); // parses JSON response into native JavaScript objects
}

export async function allTaskByProjectId(idProject, idUser, token) {
    let response = await fetch(`${API_URL}/api/Tasks/getByProject?idProject=${idProject}&idUser=${idUser}`, {
        method: 'GET',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            // 'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + token,
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer',
    });
    let data = await response.json();
    return data;
};