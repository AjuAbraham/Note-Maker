import axios from 'axios';

const api = axios.create({
    baseURL: "https://notemaker-4i4g.onrender.com/api/v1",
})

export default api;