import axios from "../../utils/axios"

export const login = (data) => {
    return axios.post(`/api/user/login`,data);
}