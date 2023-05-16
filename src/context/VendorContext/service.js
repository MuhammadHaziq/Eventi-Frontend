import authAxios from "src/utils/axios";

export const getVendors = () => {
    return authAxios.get("/api/vendor")
}