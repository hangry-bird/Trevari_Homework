import axios from "axios";

const BASE_URL = "https://api.itbook.store/1.0";


const instance = axios.create({
    baseURL: BASE_URL,
});
export default instance;