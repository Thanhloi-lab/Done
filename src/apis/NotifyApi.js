import {API_URL} from '../asset/js/constant';
export async function getAllByUser(id){
    let path = `${API_URL}/api/Notify/getByUser?idUser=${id}`;
    console.log(path);
    return fetch(path);
 

}