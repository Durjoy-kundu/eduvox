import axios from "axios";

export const getToken = async () => {
    try {
        console.log('Making request to /api/getToken');
        const result = await axios.get('/api/getToken', {
            timeout: 10000, // 10 second timeout
            headers: {
                'Content-Type': 'application/json',
            }
        });
        console.log('API response received:', result.data);
        return result.data;
    } catch (error) {
        console.error('Error fetching API configuration:', error);
        if (error.code === 'ECONNABORTED') {
            throw new Error('Request timeout - server may be overloaded');
        } else if (error.response) {
            throw new Error(`Server error: ${error.response.status} - ${error.response.statusText}`);
        } else if (error.request) {
            throw new Error('Network error - could not reach server');
        } else {
            throw new Error(`Request failed: ${error.message}`);
        }
    }
}