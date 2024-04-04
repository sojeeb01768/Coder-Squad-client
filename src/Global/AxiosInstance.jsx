import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://coder-squad-task-server.vercel.app', 
});

export default axiosInstance;