import http from './HttpClient'
import endpoints from "@/api/endpoints";

export const getProfile = () => http().get(endpoints.getProfile)