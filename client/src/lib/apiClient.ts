import axios from "axios";

export const apiClientMulti = axios.create({
    baseURL: "http://localhost:8080/api/v1",
    headers: {
        'Content-Type': 'multipart/form-data'
    }
});