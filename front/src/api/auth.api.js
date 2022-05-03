import axios from "axios";
import endpoints from "@/api/endpoints";

export const login = (data) => axios.post(endpoints.login, data)

export const register = (data) => axios.post(endpoints.register, data)