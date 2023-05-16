import authAxios from "src/utils/axios";

export const getCustomers = () => {
    return authAxios.get("/api/customer")
}