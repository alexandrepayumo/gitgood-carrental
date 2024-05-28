import {API_URL} from './config';

const getBranches = async () => {
    const response = await fetch(`${API_URL}/branches/`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
};

const getBranch = async (branch_id) => {
    const response = await fetch(`${API_URL}/branches/${branch_id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    });
    const data = await response.json();
    return data;
};

export { getBranches, getBranch };