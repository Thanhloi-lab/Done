
import { API_URL } from '../constant';

export const register = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("Password", data.password)
    formData.append("Name", data.name)
    formData.append("Phone", data.phone)
    console.log(`${API_URL}/api/Users/register`);

    return fetch(`${API_URL}/api/Users/register`, {
        method: 'POST',
        body: formData // body data type must match "Content-Type" header
    })
};

export const verifyEmail = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("ActivationToken", data.token)

    return fetch(`${API_URL}/api/Users/ConfirmMail`, {
        method: 'PUT',
        body: formData // body data type must match "Content-Type" header
    })
};

export const login = async (data) => {
    const formData = new FormData();
    formData.append("Mail", data.email)
    formData.append("Password", data.password)

    return fetch(`${API_URL}/api/Users/Login`, {
        method: 'POST',
        body: formData
    })
};


export const forgotPassword = async (email) => {

    return fetch(`${API_URL}/api/Users/forgetPassword?mail=${email}`, {
        method: 'POST',
    })
};

export const sendVerifyCode = async (email) => {
    return fetch(`${API_URL}/api/Users/ReSendMailConfirm?mail=${email}`, {
        method: 'POST',
    })
};

export const changePassword = async (data, token) => {
    const formData = new FormData();
    formData.append("Id", data.id)
    formData.append("Password", data.password)
    formData.append("NewPassword", data.newPassword)

    return fetch(`${API_URL}/api/Users/changePassword`, {
        method: 'PUT',
        body: formData,
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
    })
};


export const getTask = async (id, token) => {
    return fetch(`${API_URL}/api/Tasks/allTaskOf?Id=${id}`, {
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
};

export const getUserInfo = async (id) => {
    fetch(`${API_URL}/api/Users/getUser?Id=${id}`)
        .then((response) => response.json())
        .then((json) => {
            return json;
        }).catch((error) => {
            console.error(error);
        });
};

export async function getUserByText(text, token) {
    let response = await fetch(`${API_URL}/api/Users/findUser?keyword=${text}`, {
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

export async function getUserByGroupId(id, token) {
    let response = await fetch(`${API_URL}/api/Groups/allMembers?Id=${id}`, {
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

