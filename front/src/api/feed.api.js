import http from './HttpClient'
import endpoints from "@/api/endpoints";

export const getFeed = (ownerId) => http().get(`${endpoints.getFeed}/${ownerId}`)