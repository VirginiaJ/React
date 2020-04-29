import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://knowledge-test-cc540.firebaseio.com/'
});

export default axiosInstance;