import axios from "../../utils/axios"

export const login = (data) => {
    return axios.post(`/api/user/login`,data);
}

export const signUp = (data) => {
    if(data.user_type === "customer") return axios.post('/api/customer', data);
    return axios.post('/api/vendor', data);
}