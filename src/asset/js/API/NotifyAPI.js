import {API_URL} from '../constant';
export async function updateSeen(id) {
    let response = await fetch(`${API_URL}/api/Notify/updateSeen?idNotify=${id}`,{
        method:'POST'
    });
    //let data = await response.json();
    return response;
};