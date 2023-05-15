import authAxios from "src/utils/axios";

export const getProducts = () => {
    return authAxios.get("/api/product")
}

export const addProduct = (data) => {
    return authAxios.post("/api/product", data)
}