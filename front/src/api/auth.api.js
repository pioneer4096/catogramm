import http from './HttpClient'
import endpoints from "@/api/endpoints";

export const login = (data) => http().post(endpoints.login, data)

export const register = (data) => http().post(endpoints.register, data)