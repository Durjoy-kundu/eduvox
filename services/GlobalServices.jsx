import axios from "axios";

export const getToken = async () => {
    try {
        const result = await axios.get('/api/getToken');
        return result.data;
    } catch (error) {
        console.error('Error fetching token:', error);
        throw error;
    }
}