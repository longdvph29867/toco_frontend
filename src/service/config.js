import axios from "axios";

export const BASE_URL = 'https://toco-backend.vercel.app';
const configHeadres = {
    "Authorization": "Bearer " + localUserService.get().accessToken,
}
export const https = axios.create({
    baseURL: BASE_URL,
    headers: configHeadres
})