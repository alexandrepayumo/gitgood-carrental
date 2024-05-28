import {API_URL} from './config';

const getUsers = async () => {
    // const response = await fetch(`${API_URL}/reservations/`);
    const response = await fetch(`${API_URL}/users/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
};

const getUser = async (user_id) => {
    const response = await fetch(`${API_URL}/users/get/${user_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
};

export { getUsers, getUser };