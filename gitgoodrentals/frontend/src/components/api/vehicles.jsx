import {API_URL} from './config';

const getVehicles = async () => {
    const response = await fetch(`${API_URL}/vehicles/`);
    const data = await response.json();
    return data;
};

const getVehiclesByBranch = async (branch_id) => {
    try {
        const response = await fetch(`${API_URL}/vehicles/branch/${branch_id}`);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching vehicles by branch:', error);
        throw error; // Rethrow the error to handle it in the calling function
    }
};


const getVehicle = async (vehicle_id) => {
    const response = await fetch(`${API_URL}/vehicles/vehicle/${vehicle_id}`);
    const data = await response.json();
    return data;
}

export { getVehicles, getVehiclesByBranch, getVehicle };