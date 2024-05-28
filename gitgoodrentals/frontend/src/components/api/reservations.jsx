import {API_URL} from './config';

const createReservation = async (user_id, vehicle_id, start_date, end_date, extra_equipment) => {    
    const response = await fetch(`${API_URL}/reservations/create/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            user: user_id,
            vehicle: vehicle_id,
            start_date: start_date,
            end_date: end_date,
            extra_equipment: extra_equipment,
        }),
    });
    const data = await response.json();

    return data;
}

const cancelReservation = async (reservation_id) => {
    
    const response = await fetch(`${API_URL}/reservations/${reservation_id}/update/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify({
            cancelled: true,
        }),
    });
    // window.location.reload();
}

const updateReservation = async (reservation_id, fields) => {
    
    const response = await fetch(`${API_URL}/reservations/${reservation_id}/update/`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        },
        body: JSON.stringify(fields),
    });
    // window.location.reload();
}

const getReservations = async () => {
    // const response = await fetch(`${API_URL}/reservations/`);
    const response = await fetch(`${API_URL}/reservations/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
};

const getAllReservations = async () => {
    // const response = await fetch(`${API_URL}/reservations/`);
    const response = await fetch(`${API_URL}/reservations/all/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
};

const getReservation = async (reservation_id) => {
    const response = await fetch(`${API_URL}/reservations/${reservation_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Token ' + sessionStorage.getItem('token')
        }
    });
    const data = await response.json();
    return data;
};

export { createReservation, getReservations, cancelReservation, updateReservation, getAllReservations, getReservation};