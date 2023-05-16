import authAxios from "src/utils/axios";

export const addEvent = (data) => {
    return authAxios.post("/api/event", data)
}

export const getEvents = () => {
    return authAxios.get("/api/event")
}